using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.UseCases.Users.ReadOneUser;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Users;

[Route("/api/webapi/users")]
public sealed class ReadOne : EndpointBaseAsync.WithoutRequest.WithActionResult<UserDto>
{
    private readonly Command _command;

    public ReadOne(Command command)
    {
        _command = command;
    }

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<UserDto>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(cancellationToken);

        return commandResult.Match<ActionResult>(Ok,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}