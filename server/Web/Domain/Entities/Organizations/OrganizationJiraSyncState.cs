using ProjectDocumentation.Web.Domain.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Organizations;

public class OrganizationJiraSyncState
{
    public OrganizationJiraSyncState(bool value)
    {
        Value = value;
    }
    
    public bool Value { get; }
}
