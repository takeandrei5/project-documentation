namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.ReadAllIssues;

public sealed record CommandInput
{
    public string ProjectId { get; init; } = null!;
}
