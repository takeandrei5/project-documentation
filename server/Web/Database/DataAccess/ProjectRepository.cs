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

        var pageEntities = await DB.Entity<ProjectEntity>()
           .Pages.JoinQueryable()
           .Where(join => join.ParentID == id.Value)
              .Join(DB.Collection<PageEntity>(),
                 join => join.ChildID,
                 page => page.ID,
                 (_, page) => page)
           .ToListAsync(cancellationToken);
        
        if (projectEntity is null)
            return new NotFoundError($"Project with id {id.Value} not found.")
               .AsError<Project, NotFoundError>();

        return projectEntity.ToDomain(pageEntities)
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
        using var transaction = DB.Transaction();
        
        var result = await transaction.UpdateAndGet<ProjectEntity>()
           .MatchID(project.Id.Value)
           .Modify(projectEntity => projectEntity.Name, project.Name.Value)
           .Modify(projectEntity => projectEntity.IconName, project.IconName.Value)
           .ExecuteAsync(cancellationToken);
        
        await result.Pages
           .AddAsync(project.Pages.Value.Select(page => page.Id.Value),
                transaction.Session,
                cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}