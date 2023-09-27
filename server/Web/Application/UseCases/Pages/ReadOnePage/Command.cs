using ProjectDocumentation.Web.Application.Dtos;
using ProjectDocumentation.Web.Application.Extensions;
using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Pages.ReadOnePage;

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

    public async Task<Result<PageDto, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var organizationId = new Id(commandInput.OrganizationId);
        var pageId = new Id(commandInput.PageId);

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var readPageDtoResult = await organizationVerificationResult.SelectManyAsync(
                    async _ =>
                    {
                        var pageResult = await _pageRepository.FindPageByIdAsync(pageId, cancellationToken);

                        var pageDtoResult = pageResult.SelectMany(page => page.ToDto()
                               .AsSuccess<PageDto, BaseError>(),
                            error => error.AsError<PageDto, BaseError>());

                        return pageDtoResult;
                    },
                    error => Task.FromResult(error.AsError<PageDto, BaseError>()));

                return readPageDtoResult;
            },
            error => Task.FromResult(error.AsError<PageDto, BaseError>()));

        return result;
    }
}