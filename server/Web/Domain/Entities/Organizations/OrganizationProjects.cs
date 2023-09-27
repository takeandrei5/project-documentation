using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Domain.Entities.Organizations;

public sealed record OrganizationProjects
{
    public OrganizationProjects(IEnumerable<Project> value)
    {
        Value = value.ToList();
    }
    
    public List<Project> Value { get; }
}