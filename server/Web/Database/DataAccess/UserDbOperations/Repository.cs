using Giveaway.Chat.Domain.Users;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Database.DataAccess.UserDbOperations;

public class Repository : IUserRepository
{
    public Task CreateUserAsync(User user, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    public Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
