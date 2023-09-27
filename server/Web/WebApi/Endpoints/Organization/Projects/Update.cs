using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Projects.UpdateProject;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}")]
public sealed class Update : EndpointBaseAsync.WithRequest<UpdateRequest>.WithActionResult
{
    private readonly Command _command;

    public Update(Command command)
    {
        _command = command;
    }

    [HttpPatch]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] UpdateRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                Name = request.Body.Name,
                IconName = request.Body.IconName,
                OrganizationId = request.OrganizationId,
                ProjectId = request.ProjectId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(NoContent,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}