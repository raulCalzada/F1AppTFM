using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities
{
    public class ForumComment : IForumComment
    {
        public long Id { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime? CreateDate { get; set; }
        public IUser User { get; set; } = null!;
    }
}
