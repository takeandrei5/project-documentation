using ProjectDocumentation.Web.Domain.Entities.Projects;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace Giveaway.Chat.Domain.Users;

public sealed class User
{
    internal User(UserId id, UserEmail email, UserName name, UserImage image) 
    {
        Id = id;
        Email = email;
        Name = name;
        Image = image;
    }

    public UserId Id { get; }

    public UserEmail Email { get; }

    public UserName Name { get; }

    public UserImage Image { get; }

    public Project CreateProject(ProjectName projectName)
    {
        return new Project(new(Guid.NewGuid()), projectName);
    }
}
