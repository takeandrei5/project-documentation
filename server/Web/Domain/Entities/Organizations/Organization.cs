using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Domain.Entities.Organizations;

public class Organization
{
    internal Organization(Id id, OrganizationName name, OrganizationJiraSyncState jiraSyncState)
    {
        Id = id;
        Name = name;
        JiraSyncState = jiraSyncState;
    }

    public Id Id { get; }

    public OrganizationName Name { get; set; }

    public OrganizationProjects Projects { get; set; } = new(Enumerable.Empty<Project>());

    public OrganizationJiraSyncState JiraSyncState { get; set; }
}
