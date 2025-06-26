using F1.Shared.Domain.Users.Entities.Enums;
using F1.Shared.Domain.Users.Entities.Interfaces;
using F1.Shared.Domain.Users.Entities;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;

namespace F1.Users.Endpoints.CommonDtos
{
    public class UserDtoRequest
    {
        [FromRoute]
        public int UserId { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string? CreateDate { get; set; }

        public string? LastUpdateDate { get; set; }

        public bool IsActive { get; set; } = false;

        public int Role { get; set; }
        public long Points { get; set; } = 0;

        public IUser ToDomain()
        {
            return new User
            {
                Id = UserId,
                Username = Username,
                Email = Email,
                Password = Password,
                CreateDate = DateTime.TryParseExact(CreateDate, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var cDate) ? cDate : null,
                LastUpdateDate = DateTime.TryParseExact(LastUpdateDate, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out var uDate) ? uDate : null,
                IsActive = IsActive,
                Role = (Role)Role,
                Points = Points
            };
        }
    }
}
