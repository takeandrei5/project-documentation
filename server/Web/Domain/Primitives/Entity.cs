using ProjectDocumentation.Web.Exceptions;

namespace ProjectDocumentation.Web.Database.Primitives;

public abstract class Entity
{
    internal Entity(Guid id)
    {
        if (id == Guid.Empty)
            throw new DomainRuleException("Id cannot be empty.");

        Id = id;
    }

    public Guid Id { get; }
}
