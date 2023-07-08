using ProjectDocumentation.Web.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Users;

public sealed record UserId
{
    internal UserId(Guid value)
    {
        if (value == Guid.Empty)
        {
            throw new DomainRuleException("User's id cannot be empty.");
        }

        Value = value;
    }

    public Guid Value { get; }
}