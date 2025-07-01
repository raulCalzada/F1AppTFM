using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities.Interfaces
{
    public interface IForumComment
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public DateTime? CreateDate { get; set; }
        public IUser User { get; set; }
    }
}
