using ProjectDocumentation.Web.Domain.Entities.Pages;

namespace ProjectDocumentation.Web.Domain.Entities.Projects;

public sealed class Project
{
    private const string DEFAULT_PAGE_CONTENT = "<div>Hello world</div>";

    internal Project(Id id, ProjectIconName iconName, ProjectName name, ProjectPages pages)
    {
        Id = id;
        Name = name;
        IconName = iconName;
        Pages = pages;
    }

    public Id Id { get; }

    public ProjectName Name { get; set; }

    public ProjectIconName IconName { get; set; }

    public ProjectPages Pages { get; }

    public Page CreatePage(PageName pageName, PageIconName pageIconName, PageParent pageParent)
    {
        var page = new Page(new Id(),
            pageName,
            pageIconName,
            new PageContent(DEFAULT_PAGE_CONTENT),
            pageParent,
            false);

        Pages.Value.Add(page);

        return page;
    }

    public Page EditPage(Page page, PageName newName, PageIconName newIconName, PageContent newContent,
        bool isSoftDeleted, PageParent newPageParent)
    {
        page.Name = newName;
        page.IconName = newIconName;
        page.Content = newContent;
        page.IsSoftDeleted = isSoftDeleted;
        page.Parent = newPageParent;

        return page;
    }
}