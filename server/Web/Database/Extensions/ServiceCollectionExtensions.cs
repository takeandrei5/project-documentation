using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using ProjectDocumentation.Web.Database.DataAccess;
using ProjectDocumentation.Web.Domain.Interfaces;

namespace ProjectDocumentation.Web.Database.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddDataIoC(this IServiceCollection services)
    {
        AddRepositories(services);
        AddDatabase(services);
    }

    private static Task AddDatabase(this IServiceCollection services)
    {
        var serviceProvider = services.BuildServiceProvider();
        var databaseSettings = serviceProvider.GetRequiredService<IOptions<DatabaseSettings>>();

        return databaseSettings.Value.InitializeConnection();
    }

    private static void AddRepositories(IServiceCollection services)
    {
        services.AddScoped<IOrganizationRepository, OrganizationRepository>();
        services.AddScoped<IPageRepository, PageRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }
}