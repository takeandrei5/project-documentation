namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record UserDto
{
    public string? OrganizationId { get; set; }
    public string? OrganizationName { get; set; }
}