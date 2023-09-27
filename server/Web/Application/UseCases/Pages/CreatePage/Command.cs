using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Application.UseCases.Pages.CreatePage;

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

    public async Task<Result<Id, BaseError>> ExecuteAsync(CommandInput commandInput,
        CancellationToken cancellationToken)
    {
        var projectId = new Id(commandInput.ProjectId);
        var organizationId = new Id(commandInput.OrganizationId);
        var pageName = new PageName(commandInput.Name);
        var pageIconName = new PageIconName(commandInput.IconName);
        var pageParent = new PageParent(commandInput.ParentId == null
            ? null
            : new Id(commandInput.ParentId));

        var userVerificationResult = await _userValidations.VerifyUserExists(cancellationToken);

        var result = await userVerificationResult.SelectManyAsync(async user =>
            {
                var organizationVerificationResult =
                    await _organizationValidations.VerifyOrganizationExists(organizationId, user, cancellationToken);

                var createPageResult = await organizationVerificationResult.SelectManyAsync(async _ =>
                    {
                        var projectResult =
                            await _projectRepository.FindProjectByIdAsync(projectId, cancellationToken);

                        return await projectResult.SelectManyAsync(async project =>
                            {
                                if (pageParent.Value is null)
                                    return await CreatePage(project,
                                        pageName,
                                        pageIconName,
                                        pageParent,
                                        cancellationToken);

                                var parentPage =
                                    await _pageRepository.FindPageByIdAsync(pageParent.Value,
                                        cancellationToken);

                                return await parentPage.SelectManyAsync(_ =>
                                        CreatePage(project,
                                            pageName,
                                            pageIconName,
                                            pageParent,
                                            cancellationToken),
                                    error => Task.FromResult(error.AsError<Id, BaseError>()));
                            },
                            error => Task.FromResult(error.AsError<Id, BaseError>()));
                    },
                    error => Task.FromResult(error.AsError<Id, BaseError>()));

                return createPageResult;
            },
            error => Task.FromResult(error.AsError<Id, BaseError>()));

        return result;
    }

    private async Task<Result<Id, BaseError>> CreatePage(Project project, PageName pageName,
        PageIconName pageIconName, PageParent parentPage,
        CancellationToken cancellationToken)
    {
        var page = project.CreatePage(pageName, pageIconName, parentPage);

        await _pageRepository.CreateAsync(page, cancellationToken);
        await _projectRepository.UpdateAsync(project, cancellationToken);

        return page.Id.AsSuccess<Id, BaseError>();
    }
}