namespace ProjectDocumentation.Web.Application.UseCases.Projects.ReadAllProjects;

public sealed record CommandInput
{
    public string OrganizationId { get; init; } = null!;
}
