using System.Text;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ProjectDocumentation.Web.WebApi.Endpoints.Jira.Issues;

[Route("/api/webapi/jira/issues")]
public sealed class ReadAll : EndpointBaseAsync.WithoutRequest.WithActionResult
{
    private readonly HttpClient _client;

    public ReadAll(HttpClient client)
    {
        var textBytes = "takeandrei5@gmail.com:ATATT3xFfGF04Wz6VLNtdZdAETD0Ir3f2u1vd5JESdWFaT1ehPX0Nbmhm0n_dTCf4jw01nwA90OJuKrsYjKJYkUKnB_z5OUQHUj1p15PWipb0kc9zqf-QLqjUjvVSFwMaUVvuKwc-luy9tcFN0hVof4Ooh6Co2Yb32ROG_CJZOLBMtJGfDlsPQM=B40FE255"u8.ToArray();
        var base64String = Convert.ToBase64String(textBytes);
        
        _client = client;
        _client.DefaultRequestHeaders.Add("Authorization", $"Basic {base64String}");
    }

    [HttpGet]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public override async Task<ActionResult> HandleAsync(CancellationToken cancellationToken = default)
    {
        var result =
            await _client.GetAsync(new Uri("https://project-documentation-asa.atlassian.net/rest/api/2/search?jql="), cancellationToken);

        var resultContent = await result.Content.ReadAsStringAsync(cancellationToken);
        return Ok(resultContent);
    }
}