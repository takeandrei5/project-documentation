namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.UpdateOneIssue;

public sealed record CommandInput
{
    public string IssueId { get; init; } = null!;

    public string Summary { get; init; } = null!;

    public string Description { get; init; } = null!;
}
