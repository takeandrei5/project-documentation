using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.Extensions;
using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Users.ReadOneUser;

public sealed class Command
{
    private readonly IUserValidations _userValidations;

    public Command(IUserValidations userValidations)
    {
        _userValidations = userValidations;
    }

    public async Task<Result<UserDto, BaseError>> ExecuteAsync(CancellationToken cancellationToken)
    {
        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = userVerificationResult.SelectMany<UserDto, BaseError>(user => user.ToDto()
               .AsSuccess<UserDto, BaseError>(),
            error => error.AsError<UserDto, BaseError>());

        return result;
    }
}