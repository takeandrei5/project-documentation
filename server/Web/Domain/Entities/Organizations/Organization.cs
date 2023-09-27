using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Domain.Entities.Organizations;

public class Organization
{
    internal Organization(Id id, OrganizationName name)
    {
        Id = id;
        Name = name;
    }

    public Id Id { get; }

    public OrganizationName Name { get; }

    public OrganizationProjects OrganizationProjects { get; set; } = new(Enumerable.Empty<Project>());
}