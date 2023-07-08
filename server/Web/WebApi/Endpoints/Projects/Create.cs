using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Projects.CreateProject;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Projects;

[Route("/api/webapi/projects")]
public sealed class Create : EndpointBaseAsync.WithRequest<CreateRequest>.WithActionResult
{
    private readonly Command _command;

    public Create(Command command) => _command = command;

    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromBody] CreateRequest request,
        CancellationToken cancellationToken = default)
    {
        var commandResult = await _command.ExecuteAsync(new CommandInput
        {
            ProjectName = new ProjectName(request.ProjectName),
            UserEmail = new UserEmail("test@test.com")
        }, cancellationToken);

        return commandResult.Match<ActionResult>(projectId => Created($"/project-documentation/{projectId.Value}", null),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}
