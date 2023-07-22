using AutoMapper;
using Giveaway.Chat.Domain.Users;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Database.DataAccess.UserDbOperations;

public class Repository : IUserRepository
{
    private readonly IMapper _mapper;
    private readonly IMongoCollection<UserEntity> _usersCollection;

    public Repository(IMapper mapper, IOptions<DatabaseSettings> databaseSettings)
    {
        _mapper = mapper;
        _usersCollection = databaseSettings.Value.GetMongoCollection<UserEntity>();
    }

    public async Task CreateUserAsync(User user, CancellationToken cancellationToken)
    {
        var userEntity = _mapper.Map<UserEntity>(user);

        await _usersCollection.InsertOneAsync(userEntity, null, cancellationToken);
    }

    public async Task<Result<User, ForbiddenError>> FindUserByEmailAsync(string email,
        CancellationToken cancellationToken)
    {
        var user = await _usersCollection.Find(user => user.Email == email)
           .SingleOrDefaultAsync(cancellationToken);

        if (user is null)
        {
            return new ForbiddenError($"User onboarding issue for email {email}")
               .AsError<User, ForbiddenError>();
        }

        return _mapper.Map<User>(user)
           .AsSuccess<User, ForbiddenError>();
    }
}