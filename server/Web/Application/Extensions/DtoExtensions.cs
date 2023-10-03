using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace ProjectDocumentation.Web.Application.Extensions;

public static class DtoExtensions
{
    public static PageDto ToDto(this Page page)
    {
        return new PageDto
        {
            Id = page.Id.Value,
            Name = page.Name.Value,
            IconName = page.IconName.Value,
            Content = page.Content.Value,
            IsSoftDeleted = page.IsSoftDeleted
        };
    }
    
    public static ProjectListDto ToDto(this IEnumerable<Project> project)
    {
        return new ProjectListDto
        {
            Projects = project.Select(p => new ProjectListDto.ProjectItemDto()
            {
                Id = p.Id.Value,
                Name = p.Name.Value,
                IconName = p.IconName.Value
            })
        };
    }

    public static ProjectDto ToDto(this Project project)
    {
        return new ProjectDto
        {
            Id = project.Id.Value,
            Name = project.Name.Value,
            Pages = project.Pages.Value.Select(page => new PageDto
            {
                Id = page.Id.Value,
                Name = page.Name.Value,
                Content = page.Content.Value,
                IconName = page.IconName.Value,
                ParentId = page.Parent.Value?.Value,
                IsSoftDeleted = page.IsSoftDeleted
            })
        };
    }

    public static OrganizationDto ToDto(this Organization organization)
    {
        return new OrganizationDto
        {
            Id = organization.Id.Value,
            Name = organization.Name.Value
        };
    }

    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            OrganizationId = user.UserOrganization.Value?.Id.Value,
            OrganizationName = user.UserOrganization.Value?.Name.Value
        };
    }
}