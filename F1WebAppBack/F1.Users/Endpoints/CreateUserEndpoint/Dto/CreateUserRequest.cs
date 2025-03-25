using F1.Shared.Domain.Users.Entities.Enums;
using F1.Shared.Domain.Users.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace F1.Users.Endpoints.CreateUserEndpoint.Dto
{
    public class CreateUserRequest
    {
        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? CreateDate { get; set; }

        public string? LastUpdateDate { get; set; }

        public bool IsActive { get; set; } = false;

        public int Role { get; set; }

        public IUser ToDomain()
        {
            return new User
            {
                Username = Username,
                Email = Email,
                Password = Password,
                CreateDate = DateTime.TryParse(CreateDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out var cDate) ? cDate : null,
                LastUpdateDate = DateTime.TryParse(LastUpdateDate, CultureInfo.InvariantCulture, DateTimeStyles.None, out var uDate) ? uDate : null,
                IsActive = IsActive,
                Role = (Role)Role
            };
        }
    }
}
