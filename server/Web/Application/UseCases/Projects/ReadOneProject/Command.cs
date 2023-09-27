using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.Extensions;
using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.ReadOneProject;

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

    public async Task<Result<ProjectDto, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var projectId = new Id(commandInput.ProjectId);
        var organizationId = new Id(commandInput.OrganizationId);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var readProjectResult = await organizationVerificationResult.SelectManyAsync(async _ =>
                    {
                        var projectResult =
                            await _projectRepository.FindProjectByIdAsync(projectId, cancellationToken);

                        var readProjectDtoResult = projectResult
                           .SelectMany(project => project.ToDto()
                                   .AsSuccess<ProjectDto, BaseError>(),
                                error => error.AsError<ProjectDto, BaseError>());

                        return readProjectDtoResult;
                    },
                    error => Task.FromResult(error.AsError<ProjectDto, BaseError>()));

                return readProjectResult;
            },
            error => Task.FromResult(error.AsError<ProjectDto, BaseError>()));

        return result;
    }
}