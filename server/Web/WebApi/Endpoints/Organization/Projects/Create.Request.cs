using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

public sealed record CreateRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; } = null!;

    [FromBody]
    public CreateRequestBody Body { get; init; } = null!;
}

public sealed record CreateRequestBody
{
    public string Name { get; init; } = null!;
    public string? IconName { get; init; }
}