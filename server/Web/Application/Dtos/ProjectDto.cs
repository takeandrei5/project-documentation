namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record ProjectDto
{
    public string Id { get; init; } = null!;

    public string Name { get; set; } = null!;
    
    public IEnumerable<PageDto> Pages { get; set; } = Enumerable.Empty<PageDto>();

    public sealed record PageDto
    {
        public string Id { get; init; } = null!;

        public string Name { get; set; } = null!;

        public string? IconName { get; set; } = null!;

        public string? ParentId { get; set; }
    }
}