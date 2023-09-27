namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization;

public sealed record CreateRequest
{
    public string OrganizationName { get; init; } = null!;
}