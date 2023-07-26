using Giveaway.Chat.Domain.Users;
using ProjectDocumentation.Web.Common.Interfaces;
using ProjectDocumentation.Web.Domain.Entities.Users;
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

    public async Task<Maybe<User>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var email = _loggedUser.GetEmailFromClaims();
        var name = _loggedUser.GetNameFromClaims();
        var image = _loggedUser.GetImageFromClaims();

        var userResult = await _userRepository.FindUserByEmailAsync(email, cancellationToken);

        return await userResult.MatchAsync(_ => Task.FromResult(Maybe.None<User>()),
            async _ =>
            {
                var newUser = new User(new UserId(Guid.NewGuid()),
                    new UserEmail(email),
                    new UserName(name),
                    new UserImage(image));
                await _userRepository.CreateUserAsync(newUser, cancellationToken);

                return Maybe.Some(newUser);
            });
    }
}