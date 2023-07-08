using Giveaway.Web.WebApi.Extensions;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoClientSettings>(builder.Configuration.GetSection("ProjectDocumentationDatabase"));

builder.Services.AddApplicationUseCases();
builder.Services.AddRepositories();
builder.Services.AddAutoMapperProfiles();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(swaggerOptions => swaggerOptions.RouteTemplate = "api/swagger/{documentname}/swagger.json");
    app.UseSwaggerUI(swaggerUiOptions =>
    {
        swaggerUiOptions.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Project Documentation APIs v1");
        swaggerUiOptions.RoutePrefix = "api/swagger";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
