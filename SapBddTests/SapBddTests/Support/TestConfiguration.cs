using Microsoft.Extensions.Configuration;

namespace SapBddTests.Support;

internal static class TestConfiguration
{
    private static readonly IConfiguration Config = new ConfigurationBuilder()
        .AddUserSecrets(typeof(TestConfiguration).Assembly)
        .Build();

    public static string Username => Config["MockSap:Username"]
        ?? throw new InvalidOperationException(
            "MockSap:Username not found in user secrets. Run: dotnet user-secrets set \"MockSap:Username\" \"<value>\"");

    public static string Password => Config["MockSap:Password"]
        ?? throw new InvalidOperationException(
            "MockSap:Password not found in user secrets. Run: dotnet user-secrets set \"MockSap:Password\" \"<value>\"");
}
