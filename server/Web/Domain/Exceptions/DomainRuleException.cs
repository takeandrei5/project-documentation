namespace ProjectDocumentation.Web.Domain.Exceptions;

internal sealed class DomainRuleException : Exception
{
    public DomainRuleException(string message) : base(message) { }
}
