using F1.Shared.Domain.Users.Entities;
using F1.Shared.Domain.Users.Entities.Enums;
using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Shared.Database.Repositories.Users.Dtos
{
    public class UserDto
    {
        public int UserId { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public DateTime? CreateDate { get; set; }

        public DateTime? LastUpdateDate { get; set; }

        public bool IsActive { get; set; } = false;

        public int Rol { get; set; } = 2; // Default value for Role.User

        public IUser ToDomain()
        {
            return new User
            {
                Id = UserId,
                Username = Username,
                Email = Email,
                Password = Password,
                CreateDate = CreateDate,
                LastUpdateDate = LastUpdateDate,
                IsActive = IsActive,
                Role = (Role)Rol
            };
        }

        public static UserDto FromDomain(IUser user)
        {
            return new UserDto
            {
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email,
                Password = user.Password,
                CreateDate = user.CreateDate,
                LastUpdateDate = user.LastUpdateDate,
                IsActive = user.IsActive,
                Rol = (int)user.Role
            };
        }
    }
}
