using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Pages.UpdatePage;

public sealed class Command
{
    private readonly IOrganizationValidations _organizationValidations;
    private readonly IPageRepository _pageRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly IUserValidations _userValidations;

    public Command(IOrganizationValidations organizationValidations, IPageRepository pageRepository,
        IProjectRepository projectRepository,
        IUserValidations userValidations)
    {
        _organizationValidations = organizationValidations;
        _pageRepository = pageRepository;
        _projectRepository = projectRepository;
        _userValidations = userValidations;
    }

    public async Task<Result<BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var projectId = new Id(commandInput.ProjectId);
        var organizationId = new Id(commandInput.OrganizationId);
        var pageId = new Id(commandInput.PageId);
        var pageName = new PageName(commandInput.Name);
        var pageIconName = new PageIconName(commandInput.IconName);
        var pageContent = new PageContent(commandInput.Content);
        var parentId = new PageParent(commandInput.ParentId == null
            ? null
            : new Id(commandInput.ParentId));
        var pageIsSoftDeleted = commandInput.IsSoftDeleted;

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectSwitchManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var updatePageResult = await organizationVerificationResult.SelectSwitchManyAsync(async _ =>
                    {
                        var projectResult =
                            await _projectRepository.FindProjectByIdAsync(projectId, cancellationToken);

                        return await projectResult.SelectSwitchManyAsync(async project =>
                            {
                                var pageResult =
                                    await _pageRepository.FindPageByIdAsync(pageId,
                                        cancellationToken);

                                var updatePageResult = await pageResult.SelectSwitchManyAsync(async page =>
                                    {
                                        if (parentId.Value is not null)
                                        {
                                            var pageParentResult =
                                                await _pageRepository.FindPageByIdAsync(parentId.Value,
                                                    cancellationToken);

                                            if (!pageParentResult.IsSuccess)
                                                return pageParentResult.SelectSwitchMany(err =>
                                                    err.AsError<BaseError>());
                                        }

                                        var newPage = project.EditPage(page,
                                            pageName,
                                            pageIconName,
                                            pageContent,
                                            pageIsSoftDeleted,
                                            parentId);

                                        await _pageRepository.UpdateAsync(newPage, cancellationToken);

                                        return new Success<BaseError>();
                                    },
                                    error => Task.FromResult(error.AsError<BaseError>()));

                                return updatePageResult;
                            },
                            error => Task.FromResult(error.AsError<BaseError>()));
                    },
                    error => Task.FromResult(error.AsError()));

                return updatePageResult;
            },
            error => Task.FromResult(error.AsError<BaseError>()));
        return result;
    }
}