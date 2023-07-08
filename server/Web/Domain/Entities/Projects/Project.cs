namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed class Project
{
    internal Project(ProjectId projectId, ProjectName projectName)
    {
        ProjectId = projectId;
        ProjectName = projectName;
    }

    public ProjectId ProjectId { get; init; }

    public ProjectName ProjectName { get; init; }
}
