namespace ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

public sealed record CommandInput
{
    public string OrganizationId { get; init; } = null!;

    public string Name { get; init; } = null!;
    
    public string? IconName { get; init; }
}