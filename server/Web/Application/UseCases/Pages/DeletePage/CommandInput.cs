namespace ProjectDocumentation.Web.Application.UseCases.Pages.DeletePage;

public sealed record CommandInput
{
    public string PageId { get; init; } = null!;

    public string OrganizationId { get; init; } = null!;
}