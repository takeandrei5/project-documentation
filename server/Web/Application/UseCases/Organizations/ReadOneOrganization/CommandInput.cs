namespace ProjectDocumentation.Web.Application.UseCases.Organizations.ReadOneOrganization;

public sealed record CommandInput
{
    public string Id { get; init; } = null!;
}