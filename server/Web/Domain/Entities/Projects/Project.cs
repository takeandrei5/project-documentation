using ProjectDocumentation.Web.Database.Primitives;

namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed class Project : AggregateRoot
{
    internal Project(Guid id, ProjectName projectName)
        : base(id)
    {
        ProjectName = projectName;
    }

    public ProjectName ProjectName { get; init; }
}
