namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization;

public sealed record CreateRequest
{
    public string Name { get; init; } = null!;
}