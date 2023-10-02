using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Organizations;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Domain.Interfaces;

public interface IProjectRepository
{
    Task CreateAsync(Project project, CancellationToken cancellationToken);

    Task<Result<Project, NotFoundError>> FindProjectByIdAsync(Id id, CancellationToken
        cancellationToken);
    
    Task<IEnumerable<Project>> FindProjectsByOrganizationAsync(Organization organization, CancellationToken
        cancellationToken); 
    
    Task UpdateAsync(Project project, CancellationToken cancellationToken);
}