using System.Security.Claims;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.WebApi.Extensions;

public static class ClaimsPrincipalExtension
{
    public static Maybe<string> GetEmail(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims.FirstOrDefault(claim => claim.Type == "preferred_username");

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
            return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }

    public static Maybe<string> GetName(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims.FirstOrDefault(claim => claim.Type == "name");

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
            return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }

    public static Maybe<string> GetImage(this ClaimsPrincipal claimPrincipal)
    {
        var claim = claimPrincipal.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Uri);

        if (claim == null || string.IsNullOrWhiteSpace(claim.Value))
            return Maybe.None<string>();

        return Maybe.Some(claim.Value);
    }
}
