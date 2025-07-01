using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities.Interfaces
{
    public interface IVote
    {
        public int Option { get; set; }
        public IUser User { get; set; }
    }
}
