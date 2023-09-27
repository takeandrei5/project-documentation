using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Domain.Interfaces;

public interface IUserRepository
{
    Task<Result<ConflictError>> CreateAsync(User user, CancellationToken cancellationToken);

    Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken);

    Task UpdateUserAsync(User user, CancellationToken cancellationToken);
}