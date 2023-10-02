using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Entities;
using ProjectDocumentation.Web.Database.Extensions;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Database.DataAccess;

public sealed class ProjectRepository : IProjectRepository
{
    public async Task CreateAsync(Project project, CancellationToken cancellationToken)
    {
        var projectEntity = new ProjectEntity
        {
            ID = project.Id.Value,
            Name = project.Name.Value,
            Pages = new Many<PageEntity>()
        };

        await DB.SaveAsync(projectEntity, cancellation: cancellationToken);
    }

    public async Task<Result<Project, NotFoundError>> FindProjectByIdAsync(Id id,
        CancellationToken cancellationToken)
    {
        var projectEntity = await DB.Queryable<ProjectEntity>()
           .Where(project => project.ID == id.Value)
           .FirstOrDefaultAsync(cancellationToken);

        if (projectEntity is null)
            return new NotFoundError($"Project with id {id.Value} not found.")
               .AsError<Project, NotFoundError>();

        return projectEntity.ToDomain()
           .AsSuccess<Project, NotFoundError>();
    }

    public async Task<IEnumerable<Project>> FindProjectsByOrganizationAsync(Organization organization,
        CancellationToken cancellationToken)
    {
        var projectEntities = await DB.Entity<OrganizationEntity>()
           .Projects.JoinQueryable()
           .Where(join => join.ParentID == organization.Id.Value)
           .Join(DB.Collection<ProjectEntity>(),
                join => join.ChildID,
                project => project.ID,
                (_, project) => project)
           .ToListAsync(cancellationToken);

        return projectEntities.Select(project => project.ToDomain());
    }

    public async Task UpdateAsync(Project project, CancellationToken cancellationToken)
    {
        await DB.Update<ProjectEntity>()
           .MatchID(project.Id.Value)
           .Modify(projectEntity => projectEntity.Name, project.Name.Value)
           .Modify(projectEntity => projectEntity.IconName, project.IconName.Value)
           .ExecuteAsync(cancellationToken);
    }
}