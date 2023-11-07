using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization;

public sealed record UpdateRequest
{
    [FromRoute(Name = "id")]
    public string Id { get; init; } = null!;

    [FromQuery(Name = "jiraSyncState")]
    public bool JiraSyncState { get; init; }
}
