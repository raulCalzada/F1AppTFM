using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Forum.Dtos;
using F1.Shared.Database.Repositories.Forum.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using System.Data;

namespace F1.Shared.Database.Repositories.Forum
{
    public class ForumThreadCommentRepository : IForumThreadCommentRepository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;
        public ForumThreadCommentRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }
        public async Task CreateForumComment(int forumId, string comment, long userId)
        {
            var forumComment = new
            {
                Content = comment,
                AuthorUserId = userId,
                ThreadId = forumId
            };

            await _storeProcedureRepository.ExecuteAsync("CreateForumComment", forumComment, CommandType.StoredProcedure);
        }

        public async Task DeleteForumComment(long commentId)
        {
            await _storeProcedureRepository.ExecuteAsync($"DELETE FROM ForumThreadComment where Id = {commentId}", commandType: CommandType.Text);
        }

        public async Task<IEnumerable<IForumComment>> GetAllThreadComments(int forumId)
        {
            var forumCommentDto = await  _storeProcedureRepository.QueryAsync<ForumThreadCommentDto>($"SELECT * FROM ForumThreadComment WHERE ThreadId = {forumId}", commandType: CommandType.Text);
            return forumCommentDto.Select(x => x.ToDomain()).ToList();
        }
    }
}
