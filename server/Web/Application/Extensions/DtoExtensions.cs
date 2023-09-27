using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Application.Extensions;

public static class DtoExtensions
{
    public static PageDto ToDto(this Page page)
    {
        return new PageDto
        {
            Id = page.Id.Value,
            Name = page.Name.Value,
            Content = page.Content.Value,
            IsSoftDeleted = page.IsSoftDeleted
        };
    }

    public static ProjectDto ToDto(this Project project)
    {
        return new ProjectDto
        {
            Id = project.Id.Value,
            Name = project.Name.Value,
            Pages = project.Pages.Value.Select(page => new ProjectDto.PageDto
            {
                Id = page.Id.Value,
                Name = page.Name.Value,
                IconName = page.IconName.Value,
                ParentId = page.Parent.Value?.Value
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
}