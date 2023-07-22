using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using ProjectDocumentation.Web.Common.Interfaces;
using ProjectDocumentation.Web.Domain.Interfaces;
using ProjectDocumentation.Web.WebApi.Models;
using ProjectDocumentation.Web.WebApi.Services;
using ProjectRepository = ProjectDocumentation.Web.Database.DataAccess.ProjectDbOperations.Repository;
using UserRepository = ProjectDocumentation.Web.Database.DataAccess.UserDbOperations.Repository;

namespace ProjectDocumentation.Web.WebApi.Extensions;

public static partial class ServicesExtensions
{
    public static void AddAutoMapperProfiles(this IServiceCollection services)
    {
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    }
    
    public static void AddApplicationServices(this IServiceCollection services) =>
        services.AddScoped<ILoggedUser, HttpContextLoggedUser>();

    public static void AddApplicationUseCases(this IServiceCollection services)
    {
        // Projects
        services.AddCreateProjectUseCase();

        // Users
        services.AddCreateUserUseCase();
    }

    //public static void AddReaders(this IServiceCollection services) =>
    //    services.AddScoped<IProject, ProjectR>();

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
    }

    public static void AddAuthenticationAndAuthorization(this IServiceCollection serviceCollection, string domain,
        string audience)
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
           .AddJwtBearer(options =>
            {
                options.Authority = domain;
                options.Audience = audience;
#if DEBUG 
                options.RequireHttpsMetadata = false; 
#endif
                options.SaveToken = true;

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        // todo - improve this
                        if (!string.IsNullOrEmpty(accessToken)
                            && (context.Request.Headers["Sec-WebSocket-Version"] == "13"
                                || context.Request.Headers["Accept"] == "text/event-stream"))
                            context.Token = context.Request.Query["access_token"];

                        return Task.CompletedTask;
                    },
                    OnTokenValidated = async context =>
                    {
                        var currentIdentity = context.Principal!.Identities.First();

                        if (!currentIdentity.IsAuthenticated)
                            throw new InvalidOperationException("Current user is not authenticated.");

                        var accessToken = (JwtSecurityToken)context.SecurityToken;

                        var httpClient = new HttpClient
                        {
                            BaseAddress = new Uri(domain)
                        };

                        httpClient.DefaultRequestHeaders.Add(HeaderNames.Authorization,
                            $"Bearer {accessToken.RawData}");
                        httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");

                        var response = await httpClient.GetFromJsonAsync<UserInfo>("userinfo", CancellationToken.None);

                        if (response is null)
                            throw new InvalidOperationException("Failed fetching user information.");

                        currentIdentity.AddClaims(new Claim[]
                        {
                            new(ClaimTypes.Email, response.Email),
                            new(ClaimTypes.Name, response.Name),
                            new(ClaimTypes.Uri, response.Picture)
                        });
                    }
                };
            });
    }

    public static void AddSwagger(this IServiceCollection services, string authority, string audience)
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
                            AuthorizationUrl = new Uri($"{authority}authorize?audience={audience}"),
                            Scopes = new Dictionary<string, string>
                            {
                                {
                                    "openid profile email", "Get required info from Auth0"
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