using System.Net.Http.Json;
using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.ReadAllIssues;

public sealed class Command
{
    private readonly HttpClient _httpClient;

    public Command(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Result<JiraProjectsDto, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var uri = new Uri($"/api/jira/projects/{commandInput.ProjectId}");
        var httpResult = await _httpClient.GetAsync(uri, cancellationToken);

        if (!httpResult.IsSuccessStatusCode)
            return new NotFoundError("There was an error processing your request.")
               .AsError<JiraProjectsDto, BaseError>();

        var result = await httpResult.Content.ReadFromJsonAsync<JiraProjectsDto>(cancellationToken: cancellationToken);

        return result is null
            ? new NotFoundError("There was an error processing your request.").AsError<JiraProjectsDto, BaseError>()
            : result.AsSuccess<JiraProjectsDto, BaseError>();
    }
}
