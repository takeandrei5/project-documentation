using ProjectDocumentation.Web.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed record ProjectId
{
    internal ProjectId(Guid value)
    {
        if (value == Guid.Empty)
        {
            throw new DomainRuleException("Project's id cannot be empty.");
        }

        Value = value;
    }

    public Guid Value { get; }
}