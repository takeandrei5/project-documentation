﻿namespace ProjectDocumentation.Web.Database.Primitives;

public abstract class AggregateRoot : Entity
{
    public AggregateRoot(Guid id)
        : base(id)
    {

    }
}
