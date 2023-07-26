using ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

namespace ProjectDocumentation.Web.WebApi.Extensions;

public static partial class ServicesExtensions
{
    public static void AddCreateProjectUseCase(this IServiceCollection services) =>
        services.AddScoped<Command>();
}
