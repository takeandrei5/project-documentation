namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.DeleteOneIssue;

public sealed record CommandInput
{
    public string IssueId { get; init; } = null!;
}
