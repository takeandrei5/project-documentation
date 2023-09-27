using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects;

[Route("/api/webapi/organizations/{organizationId}/projects")]
public sealed class Create : EndpointBaseAsync.WithRequest<CreateRequest>.WithActionResult
{
    private readonly Command _command;

    public Create(Command command)
    {
        _command = command;
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] CreateRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                OrganizationId = request.OrganizationId,
                Name = request.Body.Name,
                IconName = request.Body.IconName
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(projectId =>
                Created($"/project-documentation/organization/{request.OrganizationId}/projects/{projectId.Value}",
                    null),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}