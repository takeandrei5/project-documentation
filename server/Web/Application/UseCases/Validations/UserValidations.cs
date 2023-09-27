using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Common.Interfaces;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Validations;

public sealed class UserValidations : IUserValidations
{
    private readonly ILoggedUser _loggedUser;
    private readonly IUserRepository _userRepository;

    public UserValidations(ILoggedUser loggedUser, IUserRepository userRepository)
    {
        _loggedUser = loggedUser;
        _userRepository = userRepository;
    }

    async Task<Result<User, ForbiddenError>> IUserValidations.VerifyUserExists(CancellationToken cancellationToken)
    {
        var email = _loggedUser.GetEmailFromClaims();

        var userResult = await
            _userRepository.FindUserByEmailAsync(email, cancellationToken);

        return userResult;
    }
}