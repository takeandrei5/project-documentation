using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Interfaces;

namespace ProjectDocumentation.Web.Database.DataAccess.ProjectDbOperations;

public sealed class Repository : IProjectRepository
{
    private readonly IMapper _mapper;
    private readonly IMongoCollection<ProjectEntity> _projectsCollection;

    public Repository(IMapper mapper, IOptions<DatabaseSettings> databaseSettings)
    {
        _mapper = mapper;
        _projectsCollection = databaseSettings.Value.GetMongoCollection<ProjectEntity>();
    }

    public async Task CreateAsync(Project project, CancellationToken cancellationToken)
    {
        var projectEntity = _mapper.Map<ProjectEntity>(project);

        await _projectsCollection.InsertOneAsync(projectEntity, null, cancellationToken);
    }
}