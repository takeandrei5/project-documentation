using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Pages.DeletePage;

public sealed class Command
{
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IPageRepository _pageRepository;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationValidations organizationValidations, IPageRepository pageRepository,
        IUserValidations userValidations)
    {
        _organizationValidations = organizationValidations;
        _pageRepository = pageRepository;
        _userValidations = userValidations;
    }

    public async Task<Result<BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var organizationId = new Id(commandInput.OrganizationId);
        var pageId = new Id(commandInput.PageId);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectSwitchManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var deletePageResult = await organizationVerificationResult.SelectSwitchManyAsync(async _ =>
                    {
                        var pageResult =
                            await _pageRepository.FindPageByIdAsync(pageId,
                                cancellationToken);

                        var deletePageResult = await pageResult.SelectSwitchManyAsync(async page =>
                            {
                                await _pageRepository.DeleteAsync(page, cancellationToken);

                                return new Success<BaseError>();
                            },
                            error => Task.FromResult(error.AsError<BaseError>()));

                        return deletePageResult;
                    },
                    error => Task.FromResult(error.AsError()));

                return deletePageResult;
            },
            error => Task.FromResult(error.AsError<BaseError>()));
        return result;
    }
}