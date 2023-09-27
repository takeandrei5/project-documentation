namespace ProjectDocumentation.Web.Domain.Errors;

public sealed class ConflictError : BaseError
{
    public ConflictError(string errorMessage) : base(409, errorMessage) { }

    public override string Title => "Conflict error.";

    public override string Type => "https://tools.ietf.org/html/rfc7231#section-6.5.8";
}