namespace ProjectDocumentation.Web.Domain.Entities.Pages;

public sealed record PageContent
{
    public PageContent(string? value)
    {
        Value = value;
    }

    public string? Value { get; }
}