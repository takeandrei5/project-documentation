﻿using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using ProjectDocumentation.Web.Application.UseCases.Organizations.CreateOrganization;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Organization;

[Route("/api/webapi/organizations")]
public sealed class Create : EndpointBaseAsync.WithRequest<CreateRequest>.WithActionResult
{
    private readonly Command _command;

    public Create(Command command)
    {
        _command = command;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync([FromBody] CreateRequest createRequest,
        CancellationToken cancellationToken = default)
    {
        var result = await _command.ExecuteAsync(new CommandInput
            {
                OrganizationName = createRequest.OrganizationName
            },
            cancellationToken);

        return result.Match<ActionResult>(organizationId =>
                Created($"/organizations/{organizationId.Value}", null),
            error => Problem(error.Message, HttpContext.Request.Path, error.Status, error.Title, error.Type));
    }
}