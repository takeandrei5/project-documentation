using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Domain.Interfaces;

public interface IOrganizationRepository
{
    public Task<Result<ConflictError>> CreateAsync(Organization organization,
        CancellationToken cancellationToken);

    public Task<Result<Organization, NotFoundError>> FindOrganizationByIdAsync(Id id,
        CancellationToken cancellationToken);

    Task UpdateOrganization(Organization organization, CancellationToken cancellationToken);
}