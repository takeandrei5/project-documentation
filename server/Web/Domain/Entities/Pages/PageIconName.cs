using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Pages;

public sealed record PageIconName
{
    public PageIconName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new DomainRuleException("Page icon name cannot be empty.");
        }
        Value = value;
    }

    public string Value { get; }
}