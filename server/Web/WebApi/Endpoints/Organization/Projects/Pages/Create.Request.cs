using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

public sealed record CreateRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; } = null!;

    [FromRoute(Name = "projectId")]
    public string ProjectId { get; init; } = null!;

    [FromBody]
    public CreateRequestBody Body { get; init; } = null!;
}

public sealed record CreateRequestBody
{
    public string? ParentId { get; init; }

    public string Name { get; init; } = null!;
    
    public string IconName { get; init; } = null!;
}