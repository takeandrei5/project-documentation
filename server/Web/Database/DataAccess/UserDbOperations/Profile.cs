using Giveaway.Chat.Domain.Users;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities.Users;

namespace ProjectDocumentation.Web.Database.DataAccess.UserDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<User, UserEntity>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.Value))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email.Value))
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name.Value))
           .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image.Value));

        CreateMap<UserEntity, User>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => new UserId(src.Id)))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => new UserEmail(src.Email)))
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => new UserName(src.Name)))
           .ForMember(dest => dest.Image, opt => opt.MapFrom(src => new UserImage(src.Image)));
    }
}
