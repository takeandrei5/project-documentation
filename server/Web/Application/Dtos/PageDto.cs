namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record PageDto
{
    public string Id { get; init; } = null!;

    public string Name { get; set; } = null!;

    public string? Content { get; set; }

    public bool IsSoftDeleted { get; set; }
}