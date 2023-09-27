namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record OrganizationDto
{
    public string Id { get; init; } = null!;

    public string Name { get; set; } = null!;
}