namespace F1.Shared.Application.News.UseCases.Interfaces
{
    public interface IDeleteCommentUseCase
    {
        Task<bool> DeleteComment(long commentId, long articleId);
    }
}
