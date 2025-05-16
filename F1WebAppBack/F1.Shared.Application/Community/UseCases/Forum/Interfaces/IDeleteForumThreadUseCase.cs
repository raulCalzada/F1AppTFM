namespace F1.Shared.Application.Community.UseCases.Forum.Interfaces
{
    public interface IDeleteForumThreadUseCase
    {
        Task<bool> DeleteThread(int threadId);
    }
}
