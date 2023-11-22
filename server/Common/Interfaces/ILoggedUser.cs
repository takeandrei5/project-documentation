namespace ProjectDocumentation.Web.Common.Interfaces;

public interface ILoggedUser
{
    string GetEmailFromClaims();

    string GetNameFromClaims();

    // string GetImageFromClaims();
}
