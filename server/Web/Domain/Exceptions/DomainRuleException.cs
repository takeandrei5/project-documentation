namespace ProjectDocumentation.Web.Exceptions;

internal sealed class DomainRuleException : Exception
{
    public DomainRuleException(string message) : base(message) { }
}
