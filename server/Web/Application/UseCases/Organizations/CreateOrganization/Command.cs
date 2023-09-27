using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Organizations.CreateOrganization;

public sealed class Command
{
    private readonly IOrganizationRepository _organizationRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationRepository organizationRepository,
        IUserRepository userRepository,
        IUserValidations userValidations)
    {
        _organizationRepository = organizationRepository;
        _userRepository = userRepository;
        _userValidations = userValidations;
    }

    public async Task<Result<Id, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organization = user.CreateOrganization(commandInput.OrganizationName);
                var createOrganizationResult =
                    await _organizationRepository.CreateAsync(organization, cancellationToken);

                var updateUserOrganizationResult = await createOrganizationResult.SelectSwitchManyAsync(async () =>
                    {
                        user.UserOrganization = new UserOrganization(organization);
                        await _userRepository.UpdateUserAsync(user, cancellationToken);

                        return organization.Id.AsSuccess<Id, BaseError>();
                    },
                    error => Task.FromResult(error.AsError<Id, BaseError>()));

                return updateUserOrganizationResult;
            },
            error => Task.FromResult(error.AsError<Id, BaseError>()));

        return result;
    }
}