using ProjectDocumentation.Web.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Users;

public sealed record UserName
{
    public UserName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new DomainRuleException("User name cannot be an empty name.");

        Value = value;
    }

    public string Value { get; }
}
