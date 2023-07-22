using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ProjectDocumentation.Web.Common.Attributes;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

[BsonCollection("users")]
public sealed record UserEntity
{
    [BsonId]
    [BsonElement("_id")]
    public Guid Id { get; init; }

    [BsonElement("email")]
    public string Email { get; init; } = null!;

    [BsonElement("name")]
    public string Name { get; init; } = null!;

    [BsonElement("image")]
    public string Image { get; init; } = null!;
}