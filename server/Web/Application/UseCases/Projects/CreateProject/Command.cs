using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

public sealed class Command
{
    private readonly IProjectRepository _projectRepository;
    private readonly IUserRepository _userRepository;

    public Command(IProjectRepository projectRepository, IUserRepository userRepository)
    {
        _projectRepository = projectRepository;
        _userRepository = userRepository;
    }

    public async Task<Result<Guid, ForbiddenError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var userResult = await 
            _userRepository.FindUserByEmailAsync(commandInput.UserEmail.Value, cancellationToken);

        return await userResult.SelectManyAsync(async user =>
        {
            var newProject = user.CreateProject(commandInput.ProjectName);

            await _projectRepository.CreateAsync(newProject, cancellationToken);

            return newProject.Id.AsSuccess<Guid, ForbiddenError>();
        });
    }
}
