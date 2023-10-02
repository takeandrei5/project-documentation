using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.UseCases.Organizations.ReadOneOrganization;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization;

[Route("/api/webapi/organizations/{id}")]
public sealed class ReadOne : EndpointBaseAsync.WithRequest<ReadOneRequest>.WithActionResult<OrganizationDto>
{
    private readonly Command _command;

    public ReadOne(Command command)
    {
        _command = command;
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<OrganizationDto>> HandleAsync([FromRoute] ReadOneRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                Id = request.Id,
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(Ok,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}