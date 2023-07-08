using ProjectDocumentation.Web.Database.Primitives;
using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace Giveaway.Chat.Domain.Users;

public sealed class User : AggregateRoot
{
    internal User(Guid id, UserEmail email, UserName name, UserImage image) 
        : base(id)
    {
        Email = email;
        Name = name;
        Image = image;
    }

    public UserEmail Email { get; }

    public UserName Name { get; }

    public UserImage Image { get; }

    public Project CreateProject(ProjectName projectName)
    {
        return new Project(Guid.NewGuid(), projectName);
    }
}
