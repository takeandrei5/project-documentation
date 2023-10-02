using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Users;

public sealed class User
{
    public User(Id id, UserEmail email, UserName name, UserImage image, UserOrganization userOrganization)
    {
        Id = id;
        Email = email;
        Name = name;
        Image = image;
        UserOrganization = userOrganization;
    }

    public Id Id { get; }

    public UserEmail Email { get; }

    public UserName Name { get; }

    public UserImage Image { get; }

    public UserOrganization UserOrganization { get; set; }

    public Project CreateProject(ProjectName projectName, ProjectIconName projectIconName)
    {
        if (UserOrganization.Value == null)
            throw new DomainRuleException("User must be a member of an organization to create a project.");
        
        var project = new Project(new Id(), projectIconName, projectName, new ProjectPages(Enumerable.Empty<Page>()));
        
        UserOrganization.Value.OrganizationProjects.Value.Add(project);

        return project;
    }
    
    public Project UpdateProject(Project project, ProjectName newProjectName, ProjectIconName newProjectIconName)
    {
        project.Name = newProjectName;
        project.IconName = newProjectIconName;
        
        return project;
    }

    public Organization CreateOrganization(string organizationName)
    {
        if (UserOrganization.Value is not null)
            throw new DomainRuleException("User cannot be a member of more than one organization.");

        var organization = new Organization(new Id(), new OrganizationName(organizationName));

        UserOrganization = new UserOrganization(organization);

        return organization;
    }
}