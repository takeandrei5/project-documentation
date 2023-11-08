namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record JiraProjectIssuesDto
{
    public int Total { get; set; }

    public IEnumerable<Issue> Issues { get; set; }

    public sealed record Issue
    {
        public string Id { get; set; }

        public string Key { get; set; }

        public string Summary { get; set; }
    }
}
