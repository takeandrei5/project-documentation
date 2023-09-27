using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Pages.DeletePage;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}/pages/{pageId}")]
public sealed class Delete : EndpointBaseAsync.WithRequest<DeleteRequest>.WithActionResult
{
    private readonly Command _command;

    public Delete(Command command)
    {
        _command = command;
    }

    [HttpDelete]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] DeleteRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                OrganizationId = request.OrganizationId,
                PageId = request.PageId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(NoContent,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}