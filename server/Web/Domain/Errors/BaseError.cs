namespace ProjectDocumentation.Web.Errors;

public abstract class BaseError
{
    public int Status { get; }

    public string Message { get; }

    public abstract string Title { get; }

    public abstract string { type get; }

    protected BaseError(int status, string message)
    {
        Status = status;
        Message = message;
    }
}
