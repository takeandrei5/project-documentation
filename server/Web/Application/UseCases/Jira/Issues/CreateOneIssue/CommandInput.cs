namespace ProjectDocumentation.Web.Application.UseCases.Jira.Issues.CreateOneIssue;

public sealed record CommandInput
{
    public string ProjectId { get; init; } = null!;

    public string Summary { get; init; } = null!;

    public string Description { get; init; } = null!;
}
