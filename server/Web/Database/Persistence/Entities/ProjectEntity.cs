using MongoDB.Bson.Serialization.Attributes;
using ProjectDocumentation.Web.Common.Attributes;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

[BsonCollection("projects")]
public sealed record ProjectEntity
{
    [BsonId]
    [BsonElement("_id")]
    public Guid Id { get; init; }

    [BsonElement("projectName")]
    public string ProjectName { get; init; } = null!;
}