using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

public sealed record ProjectEntity
{
    [BsonId]
    public Guid Id { get; init; }

    [BsonElement("projectName")]
    public string ProjectName { get; init; } = null!;
}
