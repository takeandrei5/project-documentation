using Microsoft.AspNetCore.Mvc;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization;

public sealed record ReadOneRequest
{
    [FromRoute(Name = "id")]
    public string Id { get; init; }
}
