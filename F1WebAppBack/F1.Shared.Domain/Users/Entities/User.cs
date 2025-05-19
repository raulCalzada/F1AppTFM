using F1.Shared.Domain.Users.Entities.Enums;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Domain.Users.Entities
{
    public class User : IUser
    {
        public long Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }

        public DateTime? LastUpdateDate { get; set; }

        public bool IsActive { get; set; } = false;

        public Role Role { get; set; } = Role.User; 
    }
}
