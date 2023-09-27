using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

public sealed class Command
{
    private readonly IOrganizationRepository _organizationRepository;
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationRepository organizationRepository,
        IOrganizationValidations organizationValidations,
        IProjectRepository projectRepository, IUserValidations userValidations)
    {
        _organizationRepository = organizationRepository;
        _organizationValidations = organizationValidations;
        _projectRepository = projectRepository;
        _userValidations = userValidations;
    }

    public async Task<Result<Id, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var organizationId = new Id(commandInput.OrganizationId);
        var projectName = new ProjectName(commandInput.Name);
        var projectIconName = new ProjectIconName(commandInput.IconName);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var createProjectResult = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var createProjectResult = await organizationVerificationResult.SelectManyAsync(
                    async _ =>
                    {
                        var newProject = user.CreateProject(projectName, projectIconName);
                        
                        await _projectRepository.CreateAsync(newProject, cancellationToken);
                        await _organizationRepository.UpdateOrganization(user.UserOrganization.Value!, cancellationToken);

                        return newProject.Id.AsSuccess<Id, BaseError>();
                    },
                    error => Task.FromResult(error.AsError<Id, BaseError>()));

                return createProjectResult;
            },
            error => Task.FromResult(error.AsError<Id, BaseError>()));

        return createProjectResult;
    }
}