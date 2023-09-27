using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

[Collection("projects")]
public sealed record ProjectEntity : IEntity
{
    public ProjectEntity()
    {
        this.InitOneToMany(() => Pages);
    }

    [Field("iconName")]
    public string? IconName { get; init; }

    [Field("name")]
    public string Name { get; init; } = null!;

    [Field("pages")]
    public Many<PageEntity> Pages { get; set; }

    [BsonId]
    [ObjectId]
    [Field("_id")]
    public string ID { get; set; }

    public string GenerateNewID()
    {
        return ID;
    }
}