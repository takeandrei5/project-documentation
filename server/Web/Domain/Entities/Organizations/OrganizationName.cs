using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Organizations;

public class OrganizationName
{
    public OrganizationName(string value)
    {
        var trimmedString = value.Trim();
        
        if (string.IsNullOrWhiteSpace(trimmedString))
        {
            throw new DomainRuleException("Organization's name cannot be an empty name.");
        }

        if (trimmedString.Length < 3)
        {
            throw new DomainRuleException("Organization's name must be at least 3 characters.");
        }

        Value = value;
    }
    
    public string Value { get; }
}