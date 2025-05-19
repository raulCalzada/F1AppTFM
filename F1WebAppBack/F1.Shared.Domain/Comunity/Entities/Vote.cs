using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Comunity.Entities
{
    public class Vote : IVote
    {
        public int Option { get; set; }
        public IUser User { get; set; }
    }
}
