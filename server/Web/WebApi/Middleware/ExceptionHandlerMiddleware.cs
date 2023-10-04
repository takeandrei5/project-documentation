using System.Net;
using ProjectDocumentation.Web.WebApi.Models;

namespace ProjectDocumentation.Web.WebApi.Middleware;

public class ExceptionHandlerMiddleware
{
    private readonly Dictionary<string, Func<HttpContext, string, Task>> _exceptionHandler = new()
    {
        {
            "DomainRuleException", async (context, message) =>
            {
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                
                await context.Response.WriteAsync(new ErrorDetails
                {
                    Message = message
                }.ToString());
            }
        }
    };

    private readonly RequestDelegate _next;

    public ExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        await _exceptionHandler[exception.GetType()
           .Name](context, exception.Message);
    }
}