using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.Interfaces;

public interface IOrganizationValidations : IValidation
{
    internal Task<Result<Organization, BaseError>> VerifyOrganizationExists(Id organizationId, User user,
        CancellationToken cancellationToken);
}