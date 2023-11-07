using Microsoft.Extensions.DependencyInjection;
using ProjectDocumentation.Web.Application.Interfaces;
using ProjectDocumentation.Web.Application.UseCases.Users.CreateUser;
using ProjectDocumentation.Web.Application.UseCases.Validations;

namespace ProjectDocumentation.Web.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddAppIoC(this IServiceCollection services)
    {
        AddCreateUseCases(services);
        AddDeleteUseCases(services);
        AddReadOneUseCases(services);
        AddReadAllUseCases(services);
        AddUpdateUseCases(services);
        AddValidations(services);

        AddJiraUseCases(services);
    }

    private static void AddCreateUseCases(IServiceCollection services)
    {
        services.AddScoped<Command>();
        services.AddScoped<UseCases.Organizations.CreateOrganization.Command>();
        services.AddScoped<UseCases.Projects.CreateProject.Command>();
        services.AddScoped<UseCases.Pages.CreatePage.Command>();
    }

    private static void AddDeleteUseCases(IServiceCollection services)
    {
        services.AddScoped<UseCases.Pages.DeletePage.Command>();
    }

    private static void AddReadOneUseCases(IServiceCollection services)
    {
        services.AddScoped<UseCases.Organizations.ReadOneOrganization.Command>();
        services.AddScoped<UseCases.Pages.ReadOnePage.Command>();
        services.AddScoped<UseCases.Projects.ReadOneProject.Command>();
        services.AddScoped<UseCases.Users.ReadOneUser.Command>();
    }

    private static void AddReadAllUseCases(IServiceCollection services)
    {
        services.AddScoped<UseCases.Projects.ReadAllProjects.Command>();
    }

    private static void AddUpdateUseCases(IServiceCollection services)
    {
        services.AddScoped<UseCases.Pages.UpdatePage.Command>();
        services.AddScoped<UseCases.Projects.UpdateProject.Command>();
    }

    private static void AddValidations(IServiceCollection services)
    {
        services.AddScoped<IOrganizationValidations, OrganizationValidations>();
        services.AddScoped<IUserValidations, UserValidations>();
    }

    private static void AddJiraUseCases(IServiceCollection services)
    {
        services.AddScoped<UseCases.Jira.Projects.ReadJiraProjects.Command>();

        services.AddScoped<UseCases.Jira.Issues.CreateOneIssue.Command>();
        services.AddScoped<UseCases.Jira.Issues.DeleteOneIssue.Command>();
        services.AddScoped<UseCases.Jira.Issues.ReadAllIssues.Command>();
        services.AddScoped<UseCases.Jira.Issues.ReadOneIssue.Command>();
        services.AddScoped<UseCases.Jira.Issues.UpdateOneIssue.Command>();
    }
}
