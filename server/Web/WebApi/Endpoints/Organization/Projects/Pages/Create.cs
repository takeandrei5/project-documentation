using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Pages.CreatePage;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}/pages")]
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
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] CreateRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                Name = request.Body.Name,
                ParentId = request.Body.ParentId,
                IconName = request.Body.IconName,
                ProjectId = request.ProjectId,
                OrganizationId = request.OrganizationId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(pageId =>
                Created(
                    $"/organizations/{request.OrganizationId}/projects/{request.ProjectId}/pages/{pageId.Value}",
                    null),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}