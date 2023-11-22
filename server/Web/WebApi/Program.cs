using Microsoft.IdentityModel.Logging;
using ProjectDocumentation.Web.CompositionRoot;
using ProjectDocumentation.Web.Database;
using ProjectDocumentation.Web.WebApi.Extensions;
using ProjectDocumentation.Web.WebApi.Middleware;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddAuthenticationAndAuthorization(configuration.GetSection("AzureAd"));
builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.Configure<DatabaseSettings>(options =>
{
    options.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
    options.DatabaseName = "project-documentation";
});

IdentityModelEventSource.ShowPII = true;

builder.Services.AddIoC();
builder.Services.AddApplicationServices();
builder.Services.AddSwagger(configuration.GetSection("AzureAd")["AuthorizationUrl"]!,
    configuration.GetSection("AzureAd")["TokenUrl"]!,
    configuration.GetSection("AzureAd")["SwaggerScope"]!);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(swaggerOptions => swaggerOptions.RouteTemplate = "api/webapi/swagger/{documentname}/swagger.json");
    app.UseSwaggerUI(swaggerUiOptions =>
    {
        swaggerUiOptions.SwaggerEndpoint("/api/webapi/swagger/v1/swagger.json", "Project documentation Web APIs v1");
        swaggerUiOptions.RoutePrefix = "api/webapi/swagger";
        swaggerUiOptions.OAuthClientId(configuration.GetSection("AzureAd")["ClientId"]);
    });
}

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseEndpoints(endpoints =>
    endpoints.MapControllers()
       .RequireAuthorization());

app.Run();
