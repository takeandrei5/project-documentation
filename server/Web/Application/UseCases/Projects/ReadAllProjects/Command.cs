using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.Extensions;
using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.ReadAllProjects;

public sealed class Command
{
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationValidations organizationValidations,
        IProjectRepository projectRepository, IUserValidations userValidations)
    {
        _organizationValidations = organizationValidations;
        _projectRepository = projectRepository;
        _userValidations = userValidations;
    }

    public async Task<Result<ProjectListDto, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var organizationId = new Id(commandInput.OrganizationId);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var readProjectResult = await organizationVerificationResult.SelectManyAsync(async organization =>
                    {
                        var projects =
                            await _projectRepository.FindProjectsByOrganizationAsync(organization, cancellationToken);

                        var readProjectDtosResult = projects.ToDto();

                        return readProjectDtosResult.AsSuccess<ProjectListDto, BaseError>();
                    },
                    error => Task.FromResult(error.AsError<ProjectListDto, BaseError>()));

                return readProjectResult;
            },
            error => Task.FromResult(error.AsError<ProjectListDto, BaseError>()));

        return result;
    }
}