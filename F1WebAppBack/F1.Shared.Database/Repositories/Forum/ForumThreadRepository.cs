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
            var sql = "INSERT INTO ForumThread (Title, Content, AuthorUserId, CreateDate) VALUES (@Title, @Content, @AuthorUserId, @CreateDate)";
            var parameters = new
            {
                Title = title,
                Content = description,
                AuthorUserId = userId,
                CreateDate = DateTime.Now
            };
            await _storeProcedureRepository.ExecuteAsync(sql, parameters, CommandType.Text);
        }

        public async Task DeleteForum(int forumId)
        {
            await _storeProcedureRepository.ExecuteAsync($"DELETE FROM ForumThread WHERE ThreadId = {forumId}", commandType: CommandType.Text);
        }

        public async Task<IEnumerable<IForum>> GetAllForums()
        {
            var forumDto = await _storeProcedureRepository.QueryAsync<ForumThreadDto>($"SELECT * FROM ForumThread order by 1 desc", commandType: CommandType.Text);
            return forumDto.Select(x => x.ToDomain()).ToList();
        }

        public async Task<IForum?> GetForumById(int forumId)
        {
            var forumDto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<ForumThreadDto?>($"SELECT * FROM ForumThread WHERE ThreadId = {forumId}", commandType: CommandType.Text);
            return forumDto?.ToDomain();
        }
    }
}