using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using ProjectDocumentation.Web.Common.Interfaces;
using ProjectDocumentation.Web.WebApi.Services;

namespace ProjectDocumentation.Web.WebApi.Extensions;

public static class ServicesExtensions
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ILoggedUser, HttpContextLoggedUser>();
    }

    public static void AddAuthenticationAndAuthorization(this IServiceCollection serviceCollection,
        IConfigurationSection azureAdConfiguration)
    {
        serviceCollection.AddAuthorization(options =>
        {
            options.AddPolicy(JwtBearerDefaults.AuthenticationScheme,
                policy =>
                {
                    policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
                    policy.RequireClaim(ClaimTypes.NameIdentifier);
                });
        });

        serviceCollection
           .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
           .AddMicrosoftIdentityWebApi(azureAdConfiguration);
    }

    public static void AddSwagger(this IServiceCollection services, string azureAuthorizationUrl, string azureTokenUrl, string swaggerScope)
    {
        services.AddSwaggerGen(swaggerGenOptions =>
        {
            swaggerGenOptions.SwaggerDoc("v1",
                new OpenApiInfo
                {
                    Title = "Project Documentation Web APIs",
                    Version = "v1"
                });

            swaggerGenOptions.AddSecurityDefinition("oauth2",
                new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            AuthorizationUrl = new Uri(azureAuthorizationUrl),
                            TokenUrl = new Uri(azureTokenUrl),
                            Scopes = new Dictionary<string, string>
                            {
                                {
                                    swaggerScope, "Get required info from Azure"
                                }
                            }
                        }
                    }
                });

            swaggerGenOptions.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "oauth2"
                        }
                    },
                    new List<string>
                    {
                        "openid profile email"
                    }
                }
            });

            swaggerGenOptions.CustomSchemaIds(t => t.FullName);
        });
    }
}
