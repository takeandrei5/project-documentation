using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace ProjectDocumentation.Web.Database.Extensions;

public static class EntityExtensions
{
    public static Organization ToDomain(this OrganizationEntity entity)
    {
        return new Organization(new Id(entity.ID),
            new OrganizationName(entity.Name));
    }

    public static Page ToDomain(this PageEntity pageEntity)
    {
        return new Page(new Id(pageEntity.ID),
            new PageName(pageEntity.Name),
            new PageIconName(pageEntity.IconName),
            new PageContent(pageEntity.Content),
            new PageParent(pageEntity.ParentId == null
                ? null
                : new Id(pageEntity.ParentId.ID)),
            pageEntity.IsSoftDeleted);
    }

    public static Project ToDomain(this ProjectEntity projectEntity)
    {
        return new Project(new Id(projectEntity.ID),
            new ProjectIconName(projectEntity.IconName),
            new ProjectName(projectEntity.Name),
            new ProjectPages(projectEntity.Pages.Select(ToDomain)));
    }

    public static User ToDomain(this UserEntity userEntity, OrganizationEntity? organizationEntity)
    {
        return new User(new Id(userEntity.ID),
            new UserEmail(userEntity.Email),
            new UserName(userEntity.Name),
            new UserImage(userEntity.Image),
            new UserOrganization(organizationEntity?.ToDomain()));
    }
}