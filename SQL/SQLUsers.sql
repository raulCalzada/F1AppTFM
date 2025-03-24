-- Create table Users
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    CreateDate DATETIME NULL,
    LastUpdateDate DATETIME NULL,
    IsActive BIT NULL,
    Rol INT NULL
);
GO

-- Insert users
INSERT INTO Users (Username, Email, Password, CreateDate, LastUpdateDate, IsActive, Rol)
VALUES 
('admin', 'admin@example.com', 'hashed_password3', '2025-03-21T11:53:03', NULL, 1, 1),
('admin2', 'admin2@example.com', 'hashed_password2', '2025-03-21T11:53:03', NULL, 1, 1),
('user1', 'user1@example.com', 'hashed_password1', '2025-03-21T11:53:03', NULL, 1, 2),
('user2', 'user2@example.com', 'hashed_password4', '2025-03-21T11:53:03', NULL, 1, 2),
('user3', 'user3@example.com', 'hashed_password5', '2025-03-21T11:53:03', NULL, 0, 2),
('user4', 'user4@example.com', 'hashed_password6', '2025-03-21T11:53:03', NULL, 1, 2),
('guest1', 'guest1@example.com', 'hashed_password7', '2025-03-21T11:53:03', NULL, 0, 2),
('guest2', 'guest2@example.com', 'hashed_password8', '2025-03-21T11:53:03', NULL, 0, 2);
GO

-- Create sp [CreateUser]
CREATE PROCEDURE [dbo].[CreateUser]
    @Username NVARCHAR(50),
    @Email NVARCHAR(100),
    @Password NVARCHAR(255),
    @Rol INT    
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Users (Username, Email, Password, CreateDate, IsActive, Rol)
    VALUES (@Username, @Email, @Password, GETDATE(), 1, @Rol);
END;
GO

--create sp [UpdateUser]
CREATE PROCEDURE [dbo].[UpdateUser]
    @UserId INT,
    @Username NVARCHAR(50),
    @Email NVARCHAR(100),
    @Password NVARCHAR(255),
    @CreateDate DATETIME,
    @LastUpdateDate DATETIME,
    @IsActive BIT,
    @Rol INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Users
    SET
        Username = @Username,
        Email = @Email,
        Password = @Password,
        CreateDate = @CreateDate,
        LastUpdateDate = @LastUpdateDate,
        IsActive = @IsActive,
        Rol = @Rol
    WHERE UserId = @UserId;
END;
GO
