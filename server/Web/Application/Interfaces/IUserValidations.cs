using ProjectDocumentation.Web.Domain.Entities.Users;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.Interfaces;

public interface IUserValidations : IValidation
{
    internal Task<Result<User, ForbiddenError>> VerifyUserExists(CancellationToken cancellationToken);
}