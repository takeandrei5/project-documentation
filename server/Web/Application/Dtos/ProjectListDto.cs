namespace ProjectDocumentation.Web.Application.Dtos;

public sealed record ProjectListDto
{
    public IEnumerable<ProjectItemDto> Projects { get; init; } = Enumerable.Empty<ProjectItemDto>();

    public sealed record ProjectItemDto
    {
        public string Id { get; init; } = null!;

        public string Name { get; init; } = null!;
        
        public string? IconName { get; init; }
    }
}