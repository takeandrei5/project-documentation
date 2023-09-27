using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Validations;

public sealed class OrganizationValidations : IOrganizationValidations
{
    private readonly IOrganizationRepository _organizationRepository;

    public OrganizationValidations(IOrganizationRepository organizationRepository)
    {
        _organizationRepository = organizationRepository;
    }

    async Task<Result<Organization, BaseError>> IOrganizationValidations.VerifyOrganizationExists(Id organizationId,
        User user, CancellationToken cancellationToken)
    {
        var organizationResult =
            await _organizationRepository.FindOrganizationByIdAsync(organizationId, cancellationToken);

        var organizationVerificationResult = organizationResult
           .SelectMany(organization =>
                {
                    if (organization.Id.Value != user.UserOrganization.Value?.Id.Value)
                        return new ForbiddenError(
                                $"You are not a member of organization with id {organization.Id.Value}.")
                           .AsError<Organization, BaseError>();

                    return organization.AsSuccess<Organization, BaseError>();
                },
                error => error.AsError<Organization, BaseError>());

        return organizationVerificationResult;
    }
}