using ProjectDocumentation.Web.Application.UseCases.Users.CreateUser;

namespace ProjectDocumentation.Web.WebApi.Extensions;

public static partial class ServicesExtensions
{
    public static void AddCreateUserUseCase(this IServiceCollection services)
    {
        services.AddScoped<Command>();
    }
}