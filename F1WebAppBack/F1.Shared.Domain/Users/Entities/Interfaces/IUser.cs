using F1.Shared.Domain.Users.Entities.Enums;

namespace F1.Shared.Domain.Users.Entities.Interfaces
{
    public interface IUser
    {
        int UserId { get; set; }
        string Username { get; set; }
        string Email { get; set; }
        string Password { get; set; }
        DateTime? CreateDate { get; set; }
        DateTime? LastUpdateDate { get; set; }
        bool IsActive { get; set; }
        Role Role { get; set; }
    }
}
