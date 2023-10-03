using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.UseCases.Projects.ReadOneProject;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}")]
public sealed class ReadOne : EndpointBaseAsync.WithRequest<ReadOneRequest>.WithActionResult<ProjectDto>
{
    private readonly Command _command;

    public ReadOne(Command command)
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
    public override async Task<ActionResult<ProjectDto>> HandleAsync([FromRoute] ReadOneRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                ProjectId = request.ProjectId,
                OrganizationId = request.OrganizationId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(Ok,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}