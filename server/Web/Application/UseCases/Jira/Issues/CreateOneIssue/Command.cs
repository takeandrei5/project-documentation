using System.Text;
using Newtonsoft.Json;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.CreateOneIssue;

public sealed class Command
{
    private readonly HttpClient _httpClient;

    public Command(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var uri = new Uri("/api/jira/issues");
        var json = JsonConvert.SerializeObject(commandInput);
        var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
        var httpResult = await _httpClient.PostAsync(uri, stringContent, cancellationToken);

        if (!httpResult.IsSuccessStatusCode)
            return new NotFoundError("There was an error processing your request.")
               .AsError<BaseError>();

        return new Success<BaseError>();
    }
}
