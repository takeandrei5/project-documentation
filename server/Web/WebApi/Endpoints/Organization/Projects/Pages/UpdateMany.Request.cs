using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

public sealed record UpdateManyRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; } = null!;

    [FromRoute(Name = "projectId")]
    public string ProjectId { get; init; } = null!;

    [FromBody]
    public IEnumerable<UpdateManyRequestBody> Body { get; init; } = null!;
}

public sealed record UpdateManyRequestBody
{
    public string PageId { get; init; } = null!;
    
    public string Name { get; init; } = null!;

    public bool IsSoftDeleted { get; init; }

    public string? IconName { get; init; }

    public string? Content { get; init; }

    public string? ParentId { get; init; }
}