namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record ProjectDto
{
    public string Id { get; init; } = null!;

    public string Name { get; set; } = null!;
    
    public IEnumerable<PageDto> Pages { get; set; } = Enumerable.Empty<PageDto>();
}