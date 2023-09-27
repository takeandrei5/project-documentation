namespace ProjectDocumentation.Web.Application.UseCases.Pages.UpdatePage;

public sealed record CommandInput
{
    public string ProjectId { get; init; } = null!;

    public string OrganizationId { get; init; } = null!;

    public string PageId { get; init; } = null!;

    public string Name { get; init; } = null!;

    public string? IconName { get; init; }

    public string? Content { get; init; }

    public string? ParentId { get; init; }

    public bool IsSoftDeleted { get; init; }
}