namespace Giveaway.Web.WebApi.Extensions;

using CreateListingCommand = ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject.Command;

public static partial class ServicesExtensions
{
    public static void AddCreateProjectUseCase(this IServiceCollection services) =>
        services.AddScoped<CreateListingCommand>();
}
