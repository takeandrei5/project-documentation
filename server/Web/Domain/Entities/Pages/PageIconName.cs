namespace ProjectDocumentation.Web.Domain.Entities.Pages;

public sealed record PageIconName
{
    public PageIconName(string? value)
    {
        Value = value;
    }

    public string? Value { get; }
}