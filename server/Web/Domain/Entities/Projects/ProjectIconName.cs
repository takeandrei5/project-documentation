namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed record ProjectIconName
{
    public ProjectIconName(string? value)
    {
        Value = value;
    }

    public string? Value { get; }
}