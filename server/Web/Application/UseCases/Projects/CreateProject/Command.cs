using ProjectDocumentation.Web.Common.Interfaces;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

public sealed class Command
{
    private readonly ILoggedUser _loggedUser;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser loggedUser, IProjectRepository projectRepository, IUserRepository userRepository)
    {
        _loggedUser = loggedUser;
        _projectRepository = projectRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<ProjectId, ForbiddenError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var email = _loggedUser.GetEmailFromClaims();
        
        var userResult = await 
            _userRepository.FindUserByEmailAsync(email, cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var newProject = user.CreateProject(commandInput.ProjectName);

            await _projectRepository.CreateAsync(newProject, cancellationToken);

            return newProject.ProjectId.AsSuccess<ProjectId, ForbiddenError>();
        });
    }
}
