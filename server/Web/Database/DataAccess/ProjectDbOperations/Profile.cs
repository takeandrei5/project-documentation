using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities.Projects;

namespace ProjectDocumentation.Web.Database.DataAccess.ProjectDbOperations;

public sealed class Profile : AutoMapper.Profile
{
    public Profile()
    {
        CreateMap<Project, ProjectEntity>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.ProjectId.Value))
           .ForMember(dest => dest.ProjectName, opt => opt.MapFrom(src => src.ProjectName.Value));

        CreateMap<ProjectEntity, Project>()
           .ForMember(dest => dest.ProjectId, opt => opt.MapFrom(src => new ProjectId(src.Id)))
           .ForMember(dest => dest.ProjectName, opt => opt.MapFrom(src => new ProjectName(src.ProjectName)));
    }
}