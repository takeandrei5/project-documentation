using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

public sealed record ReadOneRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; } = null!;

    [FromRoute(Name = "pageId")]
    public string PageId { get; init; } = null!;
}
