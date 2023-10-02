using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed record ProjectName
{
    public ProjectName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new DomainRuleException("Project's name cannot be an empty name.");
        }

        if (value.Length < 3)
        {
            throw new DomainRuleException("Project's name must be at least 3 characters.");
        }

        Value = value;
    }

    public string Value { get; }
}
