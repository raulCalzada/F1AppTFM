using F1.Shared.Domain.Users.Entities;
using F1.Shared.Domain.Users.Entities.Enums;
using F1.Shared.Domain.Users.Entities.Interfaces;
using System.Globalization;

namespace F1.Users.Endpoints.GlobalDtos
{
    public class UserDto
    {
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string? CreateDate { get; set; }

        public string? LastUpdateDate { get; set; }

        public bool IsActive { get; set; } = false;

        public int Role { get; set; }

        public IUser ToDomain()
        {
            return new User
            {
                UserId = UserId,
                Username = Username,
                Email = Email,
                Password = Password,
                CreateDate = DateTime.TryParse(CreateDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out var cDate) ? cDate : null,
                LastUpdateDate = DateTime.TryParse(LastUpdateDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out var uDate) ? uDate : null,
                IsActive = IsActive,
                Role = (Role)Role
            };
        }

        public UserDto (IUser user)
        {
            UserId = user.UserId;
            Username = user.Username;
            Email = user.Email;
            Password = user.Password;
            CreateDate = user.CreateDate?.ToString();
            LastUpdateDate = user.LastUpdateDate?.ToString();
            IsActive = user.IsActive;
            Role = (int)user.Role;
        }
    }
}
