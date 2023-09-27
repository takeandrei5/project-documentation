using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Errors;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Domain.Interfaces;

public interface IPageRepository
{
    Task CreateAsync(Page page, CancellationToken cancellationToken);

    Task<Result<Page, NotFoundError>> FindPageByIdAsync(Id id, CancellationToken
        cancellationToken);
    
    Task UpdateAsync(Page page, CancellationToken cancellationToken);
    
    Task DeleteAsync(Page page, CancellationToken cancellationToken);
}