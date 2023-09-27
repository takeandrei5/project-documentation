namespace ProjectDocumentation.Web.Application.UseCases.Projects.ReadOneProject;

public sealed record CommandInput
{
    public string OrganizationId { get; init; } = null!;

    public string ProjectId { get; init; } = null!;
}
