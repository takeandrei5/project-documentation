using MongoDB.Entities;
using ProjectDocumentation.Web.Database.Extensions;
using ProjectDocumentation.Web.Database.Persistence.Entities;
using ProjectDocumentation.Web.Domain.Entities;
using ProjectDocumentation.Web.Domain.Entities.Pages;
using ProjectDocumentation.Web.Domain.Errors;
using ProjectDocumentation.Web.Domain.Interfaces;
using SoftwareCraft.Functional;

namespace ProjectDocumentation.Web.Database.DataAccess;

public sealed class PageRepository : IPageRepository
{
    public async Task CreateAsync(Page page, CancellationToken cancellationToken)
    {
        var pageEntity = new PageEntity
        {
            ID = page.Id.Value,
            Name = page.Name.Value,
            Content = page.Content.Value,
            IconName = page.IconName.Value,
            ParentId = page.Parent.Value == null
                ? null
                : new One<PageEntity>(page.Parent.Value.Value),
            IsSoftDeleted = false,
            IsHardDeleted = false
        };

        await pageEntity.SaveAsync(cancellation: cancellationToken);
    }

    public async Task<Result<Page, NotFoundError>> FindPageByIdAsync(Id id, CancellationToken cancellationToken)
    {
        var pageEntity = await DB.Find<PageEntity>()
           .OneAsync(id.Value, cancellationToken);

        return pageEntity is null
            ? new NotFoundError($"Page with id {id.Value} not found").AsError<Page, NotFoundError>()
            : pageEntity.ToDomain()
               .AsSuccess<Page, NotFoundError>();
    }

    public async Task UpdateAsync(Page page, CancellationToken cancellationToken)
    {
        await DB.Update<PageEntity>()
           .MatchID(page.Id.Value)
           .Modify(projectEntity => projectEntity.Name, page.Name.Value)
           .Modify(projectEntity => projectEntity.IconName, page.IconName.Value)
           .Modify(projectEntity => projectEntity.Content, page.Content.Value)
           .Modify(projectEntity => projectEntity.IsSoftDeleted, page.IsSoftDeleted)
           .Modify(projectEntity => projectEntity.ParentId,
                page.Parent.Value == null
                    ? null
                    : new One<PageEntity>(page.Parent.Value.Value))
           .ExecuteAsync(cancellationToken);
    }

    public async Task DeleteAsync(Page page, CancellationToken cancellationToken)
    {
        var transaction = DB.Transaction();
        var query = new Template<PageEntity>(@"
            [
                {
                    $match: {
                        _id: <id>
                    }
                },
                {
                    $graphLookup: {
                        from: '<pages_collection>',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'parentId.ID',
                        as: 'descendants'
                    }
                },
                {
                    $project: {
                        allDocuments: {
                            $concatArrays: [
                                [ ""$$ROOT"" ],
                                ""$descendants""
                            ]
                        }
                    }
                },
                {
                    $unwind: ""$allDocuments""
                },
                {
                    $replaceRoot: { newRoot: ""$allDocuments"" }
                }
            ]
        ")
           .Tag("id", "ObjectId('650f5ec5fe1d3023189af70a')")
           .Tag("pages_collection", DB.Entity<PageEntity>().CollectionName());

        var result = await transaction.PipelineAsync(query, cancellation: cancellationToken);
        
        await transaction.DeleteAsync<PageEntity>(result.Select(r => r.ID), cancellationToken);

        await transaction.CommitAsync(cancellationToken);
    }
}