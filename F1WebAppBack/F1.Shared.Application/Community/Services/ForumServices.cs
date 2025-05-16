using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Database.Repositories.Forum.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;

namespace F1.Shared.Application.Community.Services
{
    class ForumServices : IForumServices
    {
        private readonly IForumThreadRepository _forumRepository;
        private readonly IForumThreadCommentRepository _forumThreadCommentRepository;

        public ForumServices(IForumThreadRepository forumRepository, IForumThreadCommentRepository forumThreadCommentRepository)
        {
            _forumRepository = forumRepository;
            _forumThreadCommentRepository = forumThreadCommentRepository;
        }

        public async Task CreateForum(string title, string description, long userId)
        {
            await _forumRepository.CreateForum(title, description, userId);
        }

        public async Task CreateForumComment(int forumId, string comment, long userId)
        {
            await _forumThreadCommentRepository.CreateForumComment(forumId, comment, userId);
        }

        public async Task DeleteForum(int forumId)
        {
            await _forumRepository.DeleteForum(forumId);
        }

        public async Task DeleteForumComment(long commentId)
        {
            await _forumThreadCommentRepository.DeleteForumComment(commentId);
        }

        public async Task<IEnumerable<IForum>> GetAllThreads()
        {
            var forums = await _forumRepository.GetAllForums();
            return forums;
        }

        public async Task<IForum?> GetCompleteThreadForumById(int forumId)
        {
            var forum = await _forumRepository.GetForumById(forumId);

            if (forum == null)
            {
                return null;
            }

            var comments = await _forumThreadCommentRepository.GetAllThreadComments(forumId);
            
            forum.Comments = comments;

            return forum;
        }
    }
}
