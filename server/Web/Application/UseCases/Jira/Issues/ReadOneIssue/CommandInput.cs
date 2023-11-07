namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.ReadOneIssue;

public sealed record CommandInput
{
    public string IssueId { get; init; } = null!;
}
