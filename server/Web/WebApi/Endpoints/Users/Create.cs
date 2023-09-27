using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Users.CreateUser;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Users;

[Route("/api/webapi/users")]
public sealed class Create : EndpointBaseAsync.WithoutRequest.WithActionResult
{
    private readonly Command _command;

    public Create(Command command)
    {
        _command = command;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        var result = await _command.ExecuteAsync(cancellationToken);

        return result.Match<ActionResult>(NoContent, Conflict);
    }
}