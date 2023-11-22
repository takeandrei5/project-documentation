using ProjectDocumentation.Web.Common.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Users.CreateUser;

public sealed class Command
{
    private readonly ILoggedUser _loggedUser;
    private readonly IUserRepository _userRepository;

    public Command(ILoggedUser loggedUser, IUserRepository userRepository)
    {
        _loggedUser = loggedUser;
        _userRepository = userRepository;
    }

    public async Task<Result<ConflictError>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var email = _loggedUser.GetEmailFromClaims();
        var name = _loggedUser.GetNameFromClaims();
        // var image = _loggedUser.GetImageFromClaims();

        var newUser = new User(new Id(),
            new UserEmail(email),
            new UserName(name),
            // new UserImage(image),
            new UserOrganization(null));

        var result = await _userRepository.CreateAsync(newUser, cancellationToken);

        return result;
    }
}
