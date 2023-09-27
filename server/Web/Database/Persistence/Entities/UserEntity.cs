using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

[Collection("users")]
public sealed record UserEntity : IEntity
{
    [BsonId]
    [ObjectId]
    [Field("_id")]
    public string ID { get; set; }

    [Field("email")]
    public string Email { get; init; } = null!;

    [Field("name")]
    public string Name { get; init; } = null!;

    [Field("image")]
    public string Image { get; init; } = null!;

    [Field("organization")]
    public One<OrganizationEntity>? Organization { get; set; }

    public string GenerateNewID()
    {
        return ID;
    }

    static UserEntity()
    {
        DB.Index<UserEntity>()
           .Key(user => user.Email, KeyType.Ascending)
           .Option(o => o.Unique = true)
           .CreateAsync();
    }
}