using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

public sealed record CommandInput
{
    public ProjectName ProjectName { get; init; } = null!;

    public UserEmail UserEmail { get; init; } = null!;
}
