namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record JiraProjectsDto
{
    public int Total { get; set; }

    public IEnumerable<Project> Projects { get; set; }

    public sealed record Project
    {
        public string Id { get; set; }

        public string Key { get; set; }

        public string Name { get; set; }
    }
}
