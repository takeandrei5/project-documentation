using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Pages.UpdatePage;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization.Projects.Pages;

//TBD: Change this endpoint to call a direct command instead of calling a command for each page
[Route("/api/webapi/organizations/{organizationId}/projects/{projectId}/pages")]
public sealed class UpdateMany : EndpointBaseAsync.WithRequest<UpdateManyRequest>.WithActionResult
{
    private readonly Command _command;

    public UpdateMany(Command command)
    {
        _command = command;
    }

    [HttpPatch]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromRoute] UpdateManyRequest request,
        CancellationToken cancellationToken = default)
    {
        var tasks = request.Body.Select(body => _command.ExecuteAsync(new CommandInput
            {
                Name = body.Name,
                IconName = body.IconName,
                IsSoftDeleted = body.IsSoftDeleted,
                Content = body.Content,
                ProjectId = request.ProjectId,
                OrganizationId = request.OrganizationId,
                PageId = body.PageId,
                ParentId = body.ParentId
            },
            cancellationToken));
        var results = await Task.WhenAll(tasks);

        if (Array.TrueForAll(results, r => r.IsSuccess))
            return NoContent();

        var errorResult = results.First(r => !r.IsSuccess);

        return errorResult.Match<ActionResult>(NoContent,
            error =>
                Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}