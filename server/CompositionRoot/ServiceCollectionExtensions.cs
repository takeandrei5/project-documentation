using Microsoft.Extensions.DependencyInjection;
using ProjectDocumentation.Web.Application.Extensions;
using ProjectDocumentation.Web.Database.Extensions;

namespace ProjectDocumentation.Web.CompositionRoot;

public static class ServiceCollectionExtensions
{
    public static void AddIoC(this IServiceCollection services)
    {
        services.AddAppIoC();
        services.AddDataIoC();
    }
}