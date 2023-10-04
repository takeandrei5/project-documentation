using System.Text.Json;

namespace ProjectDocumentation.Web.WebApi.Models;

public sealed record ErrorDetails
{
    public string Title => "An error occurred while processing your request.";

    public string Message { get; set; } = null!;

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}