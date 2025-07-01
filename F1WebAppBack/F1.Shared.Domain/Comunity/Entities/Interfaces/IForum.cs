using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities.Interfaces
{
    public interface IForum
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IUser User { get; set; }
        public IEnumerable<IForumComment> Comments { get; set; }
    }
}
