using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace ProjectDocumentation.Web.Database;

public sealed class DatabaseSettings
{
    public required string ConnectionString { get; init; } = null!;

    public required string DatabaseName { get; init; } = null!;

    public required string CollectionName { get; init; } = null!;

    public IMongoCollection<T> GetMongoCollection<T>()
    {
        var settings = MongoClientSettings.FromConnectionString(ConnectionString);
        settings.LinqProvider = LinqProvider.V3;

        var mongoClient = new MongoClient(settings);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseName);

        var mongoCollection = mongoDatabase.GetCollection<T>(CollectionName);

        return mongoCollection;
    }
}
