using F1.Shared.Domain.News.Entities.Interfaces;

namespace F1.News.CommonDtos
{
    public class CommentResponse
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public string? CreateDate { get; set; }
        public int UserId { get; set; }
        public long? NewId { get; set; }

        public CommentResponse(IArticleComment articleComment)
        {
            Id = articleComment.Id;
            Comment = articleComment.Comment;
            CreateDate = articleComment.CreateDate?.ToString("dd/MM/yyyy HH:mm:ss");
            UserId = (int)articleComment.User.Id;
        }

        public CommentResponse(IArticleComment articleComment, long newId)
        {
            Id = articleComment.Id;
            Comment = articleComment.Comment;
            CreateDate = articleComment.CreateDate?.ToString("dd/MM/yyyy HH:mm:ss");
            UserId = (int)articleComment.User.Id;
            NewId = newId;
        }
    }
}
