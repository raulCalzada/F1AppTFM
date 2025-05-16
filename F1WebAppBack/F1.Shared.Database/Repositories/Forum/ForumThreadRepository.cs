using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Forum.Dtos;
using F1.Shared.Database.Repositories.Forum.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using System.Data;

namespace F1.Shared.Database.Repositories.Forum
{
    public class ForumThreadRepository : IForumThreadRepository
    {

        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public ForumThreadRepository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task CreateForum(string title, string description, long userId)
        {
            var forumThreadDto = new
            {
                Title = title,
                Description = description,
                AuthorUserId = userId
            };
            await _storeProcedureRepository.ExecuteAsync("CreateForumThread", forumThreadDto, CommandType.StoredProcedure);
        }

        public async Task DeleteForum(int forumId)
        {
            await _storeProcedureRepository.ExecuteAsync($"DELETE FROM ForumThread WHERE ThreadId = {forumId}", commandType: CommandType.Text);
        }

        public async Task<IEnumerable<IForum>> GetAllForums()
        {
            var forumDto = await _storeProcedureRepository.QueryAsync<ForumThreadDto>($"SELECT * FROM ForumThread", commandType: CommandType.Text);
            return forumDto.Select(x => x.ToDomain()).ToList();
        }

        public async Task<IForum?> GetForumById(int forumId)
        {
            var forumDto = await _storeProcedureRepository.QuerySingleAsync<ForumThreadDto>($"SELECT * FROM ForumThread WHERE ThreadId = {forumId}", commandType: CommandType.Text);
            return forumDto?.ToDomain();
        }
    }
}