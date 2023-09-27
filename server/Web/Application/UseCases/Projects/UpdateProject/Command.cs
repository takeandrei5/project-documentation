using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.UpdateProject;

public sealed class Command
{
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationValidations organizationValidations,
        IProjectRepository projectRepository,
        IUserValidations userValidations)
    {
        _organizationValidations = organizationValidations;
        _projectRepository = projectRepository;
        _userValidations = userValidations;
    }

    public async Task<Result<BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var projectId = new Id(commandInput.ProjectId);
        var organizationId = new Id(commandInput.OrganizationId);
        var projectName = new ProjectName(commandInput.Name);
        var projectIconName = new ProjectIconName(commandInput.IconName);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectSwitchManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var editPageResult = await organizationVerificationResult.SelectSwitchManyAsync(async _ =>
                    {
                        var projectResult =
                            await _projectRepository.FindProjectByIdAsync(projectId, cancellationToken);

                        return await projectResult.SelectSwitchManyAsync(async project =>
                            {
                                var updateProjectResult = await projectResult.SelectSwitchManyAsync<BaseError>(
                                    async page =>
                                    {
                                        var newProject = user.UpdateProject(project,
                                            projectName,
                                            projectIconName);

                                        await _projectRepository.UpdateAsync(newProject, cancellationToken);

                                        return new Success<BaseError>();
                                    },
                                    error => Task.FromResult(error.AsError<BaseError>()));

                                return updateProjectResult;
                            },
                            error => Task.FromResult(error.AsError<BaseError>()));
                    },
                    error => Task.FromResult(error.AsError()));

                return editPageResult;
            },
            error => Task.FromResult(error.AsError<BaseError>()));
        return result;
    }
}