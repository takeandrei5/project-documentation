namespace ProjectDocumentation.Web.Application.UseCases.Organizations.UpdateOrganization;

public sealed record CommandInput
{
    public string Id { get; init; } = null!;
    
    public string Name { get; init; } = null!;
    
    public bool JiraSyncState { get; init; }
}
