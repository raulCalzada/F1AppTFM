namespace F1.Shared.Application.Community.UseCases.Forum.Interfaces
{
    public interface IDeleteForumCommentUseCase
    {
        Task DeleteComment(long commentId);
    }
}
