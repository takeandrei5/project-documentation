using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

public sealed record ReadOneRequest
{
    [FromRoute(Name = "organizationId")]
    public string OrganizationId { get; init; }
    
    [FromRoute(Name = "projectId")]
    public string ProjectId { get; init; }
}
