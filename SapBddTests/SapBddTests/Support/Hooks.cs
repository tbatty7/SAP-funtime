using System.Diagnostics;
using Reqnroll;

namespace SapBddTests.Support;

[Binding]
public class Hooks
{
    private static Process? _serverProcess;

    [BeforeTestRun]
    public static void StartMockServer()
    {
        if (IsServerAlreadyRunning())
            return;

        var repoRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "../../../../.."));
        var serverScript = Path.Combine(repoRoot, "MockSapServer", "src", "server.js");

        _serverProcess = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "node",
                Arguments = serverScript,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            }
        };

        _serverProcess.Start();
        Thread.Sleep(1500);
    }

    [AfterTestRun]
    public static void StopMockServer()
    {
        if (_serverProcess is null)
            return;

        try { _serverProcess.Kill(); } catch { /* already stopped */ }
        _serverProcess.Dispose();
        _serverProcess = null;
    }

    private static bool IsServerAlreadyRunning()
    {
        try
        {
            using var client = new System.Net.Http.HttpClient();
            client.Timeout = TimeSpan.FromSeconds(2);
            var response = client.GetAsync("http://localhost:3054/RESTAdapter/WO/GetDetails/000004000001").GetAwaiter().GetResult();
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
}
