using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Domain.Entities.Pages;

public sealed class Page
{
    internal Page(Id id, PageName name, PageIconName iconName, PageContent content, PageParent parent, bool isSoftDeleted)
    {
        Id = id;
        Name = name;
        IconName = iconName;
        Content = content;
        Parent = parent;
        IsSoftDeleted = isSoftDeleted;
    }

    public Id Id { get; }

    public PageName Name { get; set; }

    public PageIconName IconName { get; set; }
    
    public PageContent Content { get; set; }

    public PageParent Parent { get; set; }
    
    public bool IsSoftDeleted { get; set; }
}