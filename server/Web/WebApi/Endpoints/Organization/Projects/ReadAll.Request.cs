using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

public sealed record ReadAllRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; } = null!;
}
