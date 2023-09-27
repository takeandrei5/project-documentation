using MongoDB.Driver;
using MongoDB.Entities;

namespace ProjectDocumentation.Web.Database;

public sealed class DatabaseSettings
{
    public required string DatabaseName { get; set; } = null!;
    public required string ConnectionString { get; set; } = null!;

    public async Task InitializeConnection()
    {
        await DB.InitAsync(DatabaseName, MongoClientSettings.FromConnectionString(ConnectionString));
    }
}