using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.Extensions;
using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Organizations.ReadOneOrganization;

public sealed class Command
{
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationValidations organizationValidations, IUserValidations userValidations)
    {
        _organizationValidations = organizationValidations;
        _userValidations = userValidations;
    }

    public async Task<Result<OrganizationDto, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var organizationId = new Id(commandInput.Id);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var readOrganizationResult = organizationVerificationResult.SelectMany(organization =>
                    {
                        var organizationDto = organization.ToDto();

                        return organizationDto.AsSuccess<OrganizationDto, BaseError>();
                    },
                    error => error.AsError<OrganizationDto, BaseError>());

                return readOrganizationResult;
            },
            error => Task.FromResult(error.AsError<OrganizationDto, BaseError>()));

        return result;
    }
}