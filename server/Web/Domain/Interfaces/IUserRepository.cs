using Giveaway.Chat.Domain.Users;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken);

    Task CreateUserAsync(User user, CancellationToken cancellationToken);
}
