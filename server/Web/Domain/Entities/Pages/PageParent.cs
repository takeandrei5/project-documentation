using ProjectDocumentation.Web.Exceptions;

namespace ProjectDocumentation.Web.Domain.Entities.Pages;

public sealed record PageParent
{
    public PageParent(Id? value)
    {
        Value = value;
    }

    public Id? Value { get; }
}