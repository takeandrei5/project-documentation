using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Pages.UpdatePage;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}/pages/{pageId}")]
public sealed class UpdateOne : EndpointBaseAsync.WithRequest<UpdateOneRequest>.WithActionResult
{
    private readonly Command _command;

    public UpdateOne(Command command)
    {
        _command = command;
    }

    [HttpPatch]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] UpdateOneRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
            {
                Name = request.Body.Name,
                IconName = request.Body.IconName,
                IsSoftDeleted = request.Body.IsSoftDeleted,
                Content = request.Body.Content,
                ProjectId = request.ProjectId,
                OrganizationId = request.OrganizationId,
                PageId = request.PageId,
                ParentId = request.Body.ParentId
            },
            cancellationToken);

        return commandResult.Match<ActionResult>(NoContent,
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}