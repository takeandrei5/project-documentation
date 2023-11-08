using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Organizations.UpdateOrganization;

public sealed class Command
{
    private readonly IOrganizationRepository _organizationRepository;
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationRepository organizationRepository, IOrganizationValidations organizationValidations,
        IUserValidations userValidations)
    {
        _organizationRepository = organizationRepository;
        _organizationValidations = organizationValidations;
        _userValidations = userValidations;
    }

    public async Task<Result<BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var organizationId = new Id(commandInput.Id);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectSwitchManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var updateOrganizationResult = await organizationVerificationResult.SelectSwitchManyAsync(
                    async organization =>
                    {
                        organization.Name = new OrganizationName(commandInput.Name);
                        organization.JiraSyncState = new OrganizationJiraSyncState(commandInput.JiraSyncState);

                        await _organizationRepository.UpdateOrganization(organization, cancellationToken);

                        return new Success<BaseError>();
                    },
                    error => Task.FromResult(error.AsError()));

                return updateOrganizationResult;
            },
            error => Task.FromResult(error.AsError<BaseError>()));

        return result;
    }
}
