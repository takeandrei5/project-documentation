using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Database.DataAccess.Pro;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<Project, ProjectEntity>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
           .ForMember(dest => dest.ProjectName, opt => opt.MapFrom(src => src.ProjectName.Value));

        CreateMap<ProjectEntity, Project>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
           .ForMember(dest => dest.ProjectName, opt => opt.MapFrom(src => new ProjectName(src.ProjectName)));
    }
}