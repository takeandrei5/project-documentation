namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record PageDto
{
    public string Id { get; init; } = null!;

    public string Name { get; set; } = null!;

    public string? IconName { get; set; } 
    
    public string? ParentId { get; set; }

    public string? Content { get; set; }

    public bool IsSoftDeleted { get; set; }
}