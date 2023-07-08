using Microsoft.OpenApi.Models;
using ProjectDocumentation.Web.Domain.Interfaces;

namespace Giveaway.Web.WebApi.Extensions;

using ProjectRepository = ProjectDocumentation.Web.Database.DataAccess.ProjectDbOperations.Repository;

public static partial class ServicesExtensions
{
    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        // Projects
        services.AddCreateProjectUseCase();

        // Users
        //services.AddCreateUserUseCase();
    }

    //public static void AddReaders(this IServiceCollection services) =>
    //    services.AddScoped<IProject, ProjectR>();

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IProjectRepository, ProjectRepository>();
        //services.AddScoped<IUserRepository, UserRepository>();
    }

    //public static void AddSwagger(this IServiceCollection services, string authority, string audience) =>
    //    services.AddSwaggerGen(swaggerGenOptions =>
    //    {
    //        swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo()
    //        {
    //            Title = "Giveaway APIs",
    //            Version = "v1"
    //        });

    //        swaggerGenOptions.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme()
    //        {
    //            Type = SecuritySchemeType.OAuth2,
    //            Flows = new OpenApiOAuthFlows()
    //            {
    //                Implicit = new OpenApiOAuthFlow()
    //                {
    //                    AuthorizationUrl = new Uri($"{ authority }authorize?audience={audience}"),
    //                    Scopes = new Dictionary<string, string> {
    //                        { "openid profile email", "Get required info from Auth0" },
    //                    },
    //                }
    //            },
    //        });

    //        swaggerGenOptions.AddSecurityRequirement(new OpenApiSecurityRequirement()
    //        {
    //            {
    //                new OpenApiSecurityScheme
    //                {
    //                    Reference = new OpenApiReference
    //                    {
    //                        Type = ReferenceType.SecurityScheme,
    //                        Id = "oauth2"
    //                    }
    //                },
    //                new List<string>
    //                { "openid profile email" }
    //            }
    //        });

    //        swaggerGenOptions.CustomSchemaIds(t => t.FullName);
    //    });
}
