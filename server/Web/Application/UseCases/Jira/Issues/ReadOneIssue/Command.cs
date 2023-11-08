using System.Net.Http.Json;
using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.ReadOneIssue;

public sealed class Command
{
    private readonly HttpClient _httpClient;

    public Command(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<JiraIssueDto, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var uri = new Uri($"/api/jira/issues/{commandInput.IssueId}");
        var httpResult = await _httpClient.GetAsync(uri, cancellationToken);

        if (!httpResult.IsSuccessStatusCode)
            return new NotFoundError("There was an error processing your request.")
               .AsError<JiraIssueDto, BaseError>();

        var result = await httpResult.Content.ReadFromJsonAsync<JiraIssueDto>(cancellationToken: cancellationToken);

        return result is null
            ? new NotFoundError("There was an error processing your request.").AsError<JiraIssueDto, BaseError>()
            : result.AsSuccess<JiraIssueDto, BaseError>();
    }
}
