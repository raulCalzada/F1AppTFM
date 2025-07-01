using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities
{
    public class Forum : IForum
    {
        public long Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public IUser User { get; set; } = null!;
        public DateTime? CreateDate { get; set; }
        public IEnumerable<IForumComment> Comments { get; set; } = [];
    }
}
