using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Pages.ReadOnePage;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}/pages/{pageId}")]
public sealed class ReadOne : EndpointBaseAsync.WithRequest<ReadOneRequest>.WithActionResult
{
    private readonly Command _command;

    public ReadOne(Command command)
    {
        _command = command;
    }

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] ReadOneRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                OrganizationId = request.OrganizationId,
                PageId = request.PageId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(Ok,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}