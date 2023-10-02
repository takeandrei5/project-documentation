using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.UseCases.Projects.ReadAllProjects;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

[Route("/api/webapi/organizations/{organizationId}/projects")]
public sealed class ReadAll : EndpointBaseAsync.WithRequest<ReadAllRequest>.WithActionResult<ProjectListDto>
{
    private readonly Command _command;

    public ReadAll(Command command)
    {
        _command = command;
    }

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult<ProjectListDto>> HandleAsync([FromRoute] ReadAllRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                OrganizationId = request.OrganizationId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(Ok,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}