namespace ProjectDocumentation.Web.Application.UseCases.Projects.UpdateProject;

public sealed record CommandInput
{
    public string ProjectId { get; init; } = null!;

    public string OrganizationId { get; init; } = null!;

    public string Name { get; init; } = null!;

    public string? IconName { get; init; }
}