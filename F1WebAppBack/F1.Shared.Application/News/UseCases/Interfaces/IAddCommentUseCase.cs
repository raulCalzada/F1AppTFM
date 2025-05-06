using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.Shared.Application.News.UseCases.Interfaces
{
    public interface IAddCommentUseCase
    {
        Task<IArticleComment?> AddComment(IArticleComment comment, long articleId);
    }
}
