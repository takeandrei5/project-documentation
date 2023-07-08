using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Domain.Interfaces;

public interface IProjectRepository
{
    Task CreateAsync(Project project, CancellationToken cancellationToken);
}
