using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

[Collection("pages")]
public sealed record PageEntity : IEntity
{
    [Field("name")]
    public string Name { get; init; } = null!;

    [Field("parentId")]
    public One<PageEntity>? ParentId { get; init; }

    [Field("iconName")]
    public string IconName { get; init; } = null!;

    [Field("content")]
    public string? Content { get; init; }

    [Field("isSoftDeleted")]
    public bool IsSoftDeleted { get; init; }

    [Field("isHardDeleted")]
    public bool IsHardDeleted { get; init; }

    [BsonId]
    [ObjectId]
    [Field("_id")]
    public string ID { get; set; } = null!;

    public string GenerateNewID()
    {
        return ID;
    }
}