using ProjectDocumentation.Web.Domain.Entities.Pages;

namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed record ProjectPages
{
    public ProjectPages(IEnumerable<Page> value)
    {
        Value = value.ToList();
    }

    public List<Page> Value { get; set; }
}