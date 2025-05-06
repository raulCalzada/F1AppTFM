using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.News.CommonDtos
{
    public class NewResponse
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Content { get; set; }
        public string ImageUrl1 { get; set; }
        public string ImageUrl2 { get; set; }
        public long AuthorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public IEnumerable<CommentResponse>? Comments { get; set; }

        public NewResponse(INew article)
        {
            Id = article.Id;
            Title = article.Title;
            Subtitle = article.Subtitle;
            Content = article.Content;
            ImageUrl1 = article.ImageUrl1;
            ImageUrl2 = article.ImageUrl2;
            AuthorId = article.Author.Id;
            CreateDate = article.CreateDate;
            Comments = article.Comments?.Select(c => new CommentResponse(c)).ToList();
        }
    }

    
}
