using ProjectDocumentation.Web.Domain.Entities.Organizations;

namespace ProjectDocumentation.Web.Domain.Entities.Users;

public sealed class UserOrganization
{
    public UserOrganization(Organization? value)
    {
        Value = value;
    }

    public Organization? Value { get; }
}