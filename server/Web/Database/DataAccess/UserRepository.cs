using MongoDB.Driver.Linq;
using MongoDB.Entities;
using ProjectDocumentation.Web.Database.Extensions;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Database.DataAccess;

public class UserRepository : IUserRepository
{
    public async Task<Result<ConflictError>> CreateAsync(User user, CancellationToken cancellationToken)
    {
        var userEntity = await DB.Queryable<UserEntity>()
           .Where(usr => usr.Email == user.Email.Value)
           .SingleOrDefaultAsync(cancellationToken);

        if (userEntity is not null)
            return new ConflictError("User with this email already exists").AsError();

        var newUserEntity = new UserEntity
        {
            ID = user.Id.Value,
            Name = user.Name.Value,
            Email = user.Email.Value,
            Image = user.Image.Value
        };

        await newUserEntity.SaveAsync(cancellation: cancellationToken);

        return new Success<ConflictError>();
    }

    public async Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken)
    {
        var userEntity = await DB.Queryable<UserEntity>()
           .Where(user => user.Email == email)
           .FirstOrDefaultAsync(cancellationToken);

        if (userEntity is null)
            return new ForbiddenError($"User onboarding issue for email {email}").AsError<User, ForbiddenError>();

        var organizationEntity = userEntity.Organization == null
            ? null
            : await userEntity.Organization.ToEntityAsync(cancellation: cancellationToken);

        var user = userEntity.ToDomain(organizationEntity);

        return user.AsSuccess<User, ForbiddenError>();
    }

    public async Task UpdateUserAsync(User user, CancellationToken cancellationToken)
    {
        await DB.Update<UserEntity>()
           .MatchID(user.Id.Value)
           .Modify(userEntity => userEntity.Name, user.Name.Value)
           .Modify(userEntity => userEntity.Image, user.Image.Value)
           .Modify(userEntity => userEntity.Organization,
                user.UserOrganization.Value == null
                    ? null
                    : new One<OrganizationEntity>(user.UserOrganization.Value.Id.Value))
           .ExecuteAsync(cancellationToken);
    }
}