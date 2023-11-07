namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record JiraIssueDto
{
    public string Id { get; set; }

    public string Key { get; set; }

    public string Summary { get; set; }

    public string Description { get; set; }
}
