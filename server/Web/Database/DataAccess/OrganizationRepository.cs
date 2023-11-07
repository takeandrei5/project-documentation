using MongoDB.Driver.Linq;
using MongoDB.Entities;
using ProjectDocumentation.Web.Database.Extensions;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Database.DataAccess;

public sealed class OrganizationRepository : IOrganizationRepository
{
    public async Task<Result<ConflictError>> CreateAsync(Organization organization,
        CancellationToken cancellationToken)
    {
        var organizationEntity = await DB.Queryable<OrganizationEntity>()
           .Where(org => org.Name == organization.Name.Value)
           .SingleOrDefaultAsync(cancellationToken);

        if (organizationEntity is not null)
            return new ConflictError("Organization with this name already exists").AsError();

        var newOrganizationEntity = new OrganizationEntity
        {
            ID = organization.Id.Value,
            Name = organization.Name.Value,
            Projects = new Many<ProjectEntity>()
        };

        await DB.SaveAsync(newOrganizationEntity, cancellation: cancellationToken);

        return new Success<ConflictError>();
    }

    public async Task<Result<Organization, NotFoundError>> FindOrganizationByIdAsync(Id id,
        CancellationToken cancellationToken)
    {
        var organizationEntity = await DB.Queryable<OrganizationEntity>()
           .Where(organization => organization.ID == id.Value)
           .FirstOrDefaultAsync(cancellationToken);

        if (organizationEntity is null)
            return new NotFoundError($"Organization with id {id.Value} not found.")
               .AsError<Organization, NotFoundError>();

        return organizationEntity.ToDomain()
           .AsSuccess<Organization, NotFoundError>();
    }

    public async Task UpdateOrganization(Organization organization,
        CancellationToken cancellationToken)
    {
        using var transaction = DB.Transaction();

        var result = await transaction.UpdateAndGet<OrganizationEntity>()
           .MatchID(organization.Id.Value)
           .Modify(organizationEntity => organizationEntity.Name, organization.Name.Value)
           .ExecuteAsync(cancellationToken);

        await result.Projects
           .AddAsync(organization.Projects.Value.Select(project => project.Id.Value),
                transaction.Session,
                cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}