using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using NUnit.Framework;
using Reqnroll;
using SapBddTests.Support;

namespace SapBddTests.StepDefinitions;

[Binding]
public class WorkOrderSteps
{
    private static readonly HttpClient Client = CreateClient();

    private static HttpClient CreateClient()
    {
        var credentials = Convert.ToBase64String(
            Encoding.ASCII.GetBytes($"{TestConfiguration.Username}:{TestConfiguration.Password}"));

        var client = new HttpClient { BaseAddress = new Uri("http://localhost:3054") };
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", credentials);
        return client;
    }

    private HttpResponseMessage _response = null!;
    private JsonElement _body;

    [Given("the mock SAP server is running")]
    public async Task GivenTheMockSapServerIsRunning()
    {
        try
        {
            var ping = await Client.GetAsync("/RESTAdapter/WO/GetDetails/000004000001");
            Assert.That(ping.IsSuccessStatusCode, "Mock SAP server did not respond — start it with: cd MockSapServer && node src/server.js");
        }
        catch (HttpRequestException)
        {
            Assert.Fail("Mock SAP server is not reachable on port 3054 — start it with: cd MockSapServer && node src/server.js");
        }
    }

    [When("I request work order {string}")]
    public async Task WhenIRequestWorkOrder(string orderNumber)
    {
        _response = await Client.GetAsync($"/RESTAdapter/WO/GetDetails/{orderNumber}");
        _body = await ParseBody(_response);
    }

    [When("I send a CreateUpdate request for order {string} with METHOD_TYPE {string} updating operation {string} field {string} to {string}")]
    public async Task WhenISendACreateUpdateRequest(string orderNumber, string methodType, string activity, string field, string value)
    {
        var operationValues = new Dictionary<string, object> { ["ACTIVITY"] = activity, [field] = value };
        var operationIndicators = new Dictionary<string, object> { ["ACTIVITY"] = activity, [field] = "X" };

        var payload = new
        {
            METHOD_TYPE = methodType,
            ORDERNO = orderNumber,
            IT_OPERATION = new { item = new[] { operationValues } },
            IT_OPERATION_UP = new { item = new[] { operationIndicators } }
        };

        _response = await PostJson("/RESTAdapter/WO/CreateUpdate", payload);
        _body = await ParseBody(_response);
    }

    [When("I send a bare CreateUpdate request with METHOD_TYPE {string} for order {string}")]
    public async Task WhenISendABareCreateUpdateRequest(string methodType, string orderNumber)
    {
        var payload = new
        {
            METHOD_TYPE = methodType,
            ORDERNO = orderNumber,
            IT_OPERATION = new { item = Array.Empty<object>() },
            IT_OPERATION_UP = new { item = Array.Empty<object>() }
        };

        _response = await PostJson("/RESTAdapter/WO/CreateUpdate", payload);
        _body = await ParseBody(_response);
    }

    [Then("the response RETURN type should be {string}")]
    public void ThenTheResponseReturnTypeShouldBe(string expected)
    {
        Assert.That(GetReturn("TYPE"), Is.EqualTo(expected));
    }

    [Then("the response should contain {int} operations")]
    public void ThenTheResponseShouldContainOperations(int expected)
    {
        var ops = _body.GetProperty("ET_OPERATIONS").GetProperty("item");
        Assert.That(ops.GetArrayLength(), Is.EqualTo(expected));
    }

    [Then("the response RETURN message should contain {string}")]
    public void ThenTheResponseReturnMessageShouldContain(string expected)
    {
        Assert.That(GetReturn("MESSAGE"), Does.Contain(expected));
    }

    [Then("the response RETURN field should be {string}")]
    public void ThenTheResponseReturnFieldShouldBe(string expected)
    {
        Assert.That(GetReturn("FIELD"), Is.EqualTo(expected));
    }

    [Then("when I retrieve work order {string} the operation {string} field {string} should be {string}")]
    public async Task ThenWhenIRetrieveWorkOrderTheOperationFieldShouldBe(string orderNumber, string activity, string field, string expected)
    {
        var getResponse = await Client.GetAsync($"/RESTAdapter/WO/GetDetails/{orderNumber}");
        var getBody = await ParseBody(getResponse);

        var ops = getBody.GetProperty("ET_OPERATIONS").GetProperty("item").EnumerateArray();
        var op = ops.FirstOrDefault(o => o.GetProperty("ACTIVITY").GetString() == activity);

        Assert.That(op.ValueKind, Is.Not.EqualTo(JsonValueKind.Undefined),
            $"Operation {activity} not found in work order {orderNumber}");
        Assert.That(op.GetProperty(field).GetString(), Is.EqualTo(expected));
    }

    private string GetReturn(string key) =>
        _body.GetProperty("RETURN").GetProperty(key).GetString() ?? string.Empty;

    private async Task<HttpResponseMessage> PostJson(string path, object payload)
    {
        var json = JsonSerializer.Serialize(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        return await Client.PostAsync(path, content);
    }

    private static async Task<JsonElement> ParseBody(HttpResponseMessage response)
    {
        var raw = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(raw).RootElement;
    }
}
