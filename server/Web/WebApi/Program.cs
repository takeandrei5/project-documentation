using Microsoft.Net.Http.Headers;
using MongoDB.Driver;
using MongoDB.Entities;
using ProjectDocumentation.Web.CompositionRoot;
using ProjectDocumentation.Web.Database;
using ProjectDocumentation.Web.WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddHttpClient("Auth0",
    httpClient =>
    {
        httpClient.BaseAddress = new Uri(configuration["ASPNETCORE_AUTH0_DOMAIN"]!);

        httpClient.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");
    });

builder.Services.AddAuthenticationAndAuthorization(configuration["ASPNETCORE_AUTH0_DOMAIN"]!,
    configuration["ASPNETCORE_AUTH0_AUDIENCE"]!);
builder.Services.AddHttpContextAccessor();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.Configure<DatabaseSettings>(options =>
{
    options.ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
    options.DatabaseName = "project-documentation";
});

builder.Services.AddIoC();
builder.Services.AddApplicationServices();
builder.Services.AddSwagger(configuration["ASPNETCORE_AUTH0_DOMAIN"]!, configuration["ASPNETCORE_AUTH0_AUDIENCE"]!);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(swaggerOptions => swaggerOptions.RouteTemplate = "api/webapi/swagger/{documentname}/swagger.json");
    app.UseSwaggerUI(swaggerUiOptions =>
    {
        swaggerUiOptions.SwaggerEndpoint("/api/webapi/swagger/v1/swagger.json", "Project documentation Web APIs v1");
        swaggerUiOptions.RoutePrefix = "api/webapi/swagger";
        swaggerUiOptions.OAuthClientId(configuration["AUTH0_CLIENT_ID"]);
    });
}

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
    endpoints.MapControllers()
       .RequireAuthorization());

app.Run();