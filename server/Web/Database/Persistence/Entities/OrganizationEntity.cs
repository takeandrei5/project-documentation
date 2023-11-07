using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Entities;

namespace ProjectDocumentation.Web.Database.Persistence.Entities;

[Collection("organizations")]
public sealed record OrganizationEntity : IEntity
{
    static OrganizationEntity()
    {
        DB.Index<OrganizationEntity>()
           .Key(org => org.Name, KeyType.Ascending)
           .Option(o => o.Unique = true)
           .CreateAsync();
    }

    public OrganizationEntity()
    {
        this.InitOneToMany(() => Projects);
    }

    [Field("name")]
    public string Name { get; init; } = null!;

    [Field("projects")]
    public Many<ProjectEntity> Projects { get; set; }

    [Field("jiraSyncState")]
    public bool JiraSyncState { get; init; } = false;

    [BsonId]
    [ObjectId]
    public string ID { get; set; } = null!;

    public string GenerateNewID()
    {
        return ID;
    }
}
