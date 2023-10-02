namespace ProjectDocumentation.Web.Domain.Entities.Pages;

public sealed record PageName
{
    private const string DEFAULT_VALUE = "undefined";

    public PageName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            Value = DEFAULT_VALUE;
            return;
        }

        Value = value;
    }

    public string Value { get; }
}