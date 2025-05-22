using F1.Shared.Domain.Users.Entities.Interfaces;

namespace F1.Users.Endpoints.CommonDtos
{
    public class UserDtoResponse
    {
        public long UserId { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? CreateDate { get; set; }

        public string? LastUpdateDate { get; set; }

        public bool IsActive { get; set; } = false;

        public int Role { get; set; }

        public UserDtoResponse() { }

        public UserDtoResponse(IUser user)
        {
            UserId = user.Id;
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
