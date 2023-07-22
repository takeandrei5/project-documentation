using MongoDB.Driver;
using MongoDB.Driver.Linq;
using ProjectDocumentation.Web.Common.Attributes;

namespace ProjectDocumentation.Web.Database;

public sealed class DatabaseSettings
{
    private const string DATABASE_NAME ="project-documentation";
    
    public required string ConnectionString { get; set; } = null!;

    internal IMongoCollection<T> GetMongoCollection<T>()
    {
        var settings = MongoClientSettings.FromConnectionString(ConnectionString);
        settings.LinqProvider = LinqProvider.V3;

        var mongoClient = new MongoClient(settings);
        var mongoDatabase = mongoClient.GetDatabase(DATABASE_NAME);
        
        var mongoCollection = mongoDatabase.GetCollection<T>(GetCollectionName<T>());

        return mongoCollection;
    }
    
    private static string GetCollectionName<T>()
    {
        return (typeof(T).GetCustomAttributes(typeof(BsonCollectionAttribute), true).FirstOrDefault()
            as BsonCollectionAttribute).CollectionName;
    }
}
