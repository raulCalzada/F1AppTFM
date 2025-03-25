using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.News.Dtos;
using F1.Shared.Database.Repositories.News.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;
using System.Data;

namespace F1.Shared.Database.Repositories.News
{
    class NewsRespository : INewsRespository
    {
        private readonly IStoreProcedureRepository _storeProcedureRepository;

        public NewsRespository(IStoreProcedureRepository storeProcedureRepository)
        {
            _storeProcedureRepository = storeProcedureRepository;
        }

        public async Task<IEnumerable<INew>> GetLastNews(int? quantity)
        {
            if (quantity == null)
            {
                var newsDtoList = await _storeProcedureRepository.QueryAsync<NewsDto>("SELECT * FROM News ORDER BY CreateDate DESC", commandType: CommandType.Text);
                return newsDtoList.Select(x => x.ToDomain()).ToList();
            }

            var newsDtoFilteredList = await _storeProcedureRepository.QueryAsync<NewsDto>($"SELECT TOP {quantity} * FROM News ORDER BY CreateDate DESC", new { Quantity = quantity }, CommandType.Text);
            return newsDtoFilteredList.Select(x => x.ToDomain()).ToList();
        }

        public async Task<INew?> GetNewById(long id)
        {
            var newsDto = await _storeProcedureRepository.QueryFirstOrDefaultAsync<NewsDto>($"SELECT * FROM News WHERE ArticleId = {id}", commandType: CommandType.Text);
            return newsDto?.ToDomain();
        }

        public async Task CreateNew(INew news)
        {
            var newsDto = new
            {
                Title = news.Title,
                Subtitle = news.Subtitle,
                Content = news.Content,
                ImageUrl1 = news.ImageUrl1,
                ImageUrl2 = news.ImageUrl2,
                AuthorUserId = news.Author.Id,
                CreateDate = news.CreateDate
            };
            await _storeProcedureRepository.ExecuteAsync("CreateNew", newsDto, CommandType.StoredProcedure);
        }

        public async Task UpdateNew(INew news)
        {
            var newsDto = new
            {
                ArticleId = news.Id,
                Title = news.Title,
                Subtitle = news.Subtitle,
                Content = news.Content,
                ImageUrl1 = news.ImageUrl1,
                ImageUrl2 = news.ImageUrl2,
                AuthorUserId = news.Author.Id,
                CreateDate = news.CreateDate
            };
            await _storeProcedureRepository.ExecuteAsync("UpdateNew", newsDto, CommandType.StoredProcedure);
        }

        public async Task DeleteNew(long id)
        {
            await _storeProcedureRepository.ExecuteAsync($"DELETE FROM News WHERE ArticleId = {id}", commandType: CommandType.Text);
        }
    }
}
