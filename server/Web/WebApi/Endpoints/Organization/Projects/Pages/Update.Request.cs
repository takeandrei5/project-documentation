using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

public sealed record UpdateRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; } = null!;

    [FromRoute(Name = "projectId")]
    public string ProjectId { get; init; } = null!;

    [FromRoute(Name = "pageId")]
    public string PageId { get; init; } = null!;

    [FromBody]
    public UpdateRequestBody Body { get; init; } = null!;
}

public sealed record UpdateRequestBody
{
    public string Name { get; init; } = null!;

    public bool IsSoftDeleted { get; init; }

    public string? IconName { get; init; }

    public string? Content { get; init; }

    public string? ParentId { get; init; }
}