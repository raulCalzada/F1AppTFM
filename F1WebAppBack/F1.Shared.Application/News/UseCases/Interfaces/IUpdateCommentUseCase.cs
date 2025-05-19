using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases.Interfaces
{
    public interface IUpdateCommentUseCase
    {
        Task<bool> EditComment(IArticleComment articleComment, long newId);
    }
}
