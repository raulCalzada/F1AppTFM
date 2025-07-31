IF DB_ID('F1AppDB') IS NULL
    CREATE DATABASE F1AppDB;
GO
USE F1AppDB;
GO

-- Create table Users
CREATE TABLE Users (
    UserId BIGINT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    CreateDate DATETIME NULL,
    LastUpdateDate DATETIME NULL,
    IsActive BIT NULL,
    Rol INT NULL,
    Points BIGINT NULL,
);
GO

-- Insert users
INSERT INTO Users (Username, Email, Password, CreateDate, LastUpdateDate, IsActive, Rol, Points)
VALUES 
-- Admins
('admin', 'admin@example.com', 'admin', '2025-03-21T11:53:03', NULL, 1, 1, NULL),
('lucas.morales', 'lucas.morales@example.com', 'admin', '2025-03-21T11:53:03', NULL, 1, 1, NULL),

-- Users (Rol 2)
('user', 'user@example.com', 'user', '2025-03-21T11:53:03', NULL, 1, 2, 10),
('ana.gomez', 'ana.gomez@example.com', 'user', '2025-03-21T11:53:03', NULL, 1, 2, 80),
('maria.lopez', 'maria.lopez@example.com', 'user', '2025-03-21T11:53:03', NULL, 0, 2, 3),
('pablo.rojas', 'pablo.rojas@example.com', 'user', '2025-03-21T11:53:03', NULL, 1, 2, 185),
('diego.santos', 'diego.santos@example.com', 'user', '2025-03-21T11:53:03', NULL, 1, 2, 90),
('laura.navarro', 'laura.navarro@example.com', 'user', '2025-03-21T11:53:03', NULL, 0, 2, 70),
('javier.hernandez', 'javier.hernandez@example.com', 'user', '2025-03-21T11:53:03', NULL, 1, 2, 85),
('valeria.ramirez', 'valeria.ramirez@example.com', 'user', '2025-03-21T11:53:03', NULL, 1, 2, 0),

-- Writers (Rol 3)
('laura.torres', 'laura.torres@example.com', 'writer', '2025-03-21T11:53:03', NULL, 1, 3, 0),
('carlos.vazquez', 'carlos.vazquez@example.com', 'writer', '2025-03-21T11:53:03', NULL, 1, 3, 0),
('writer', 'carlos.vazquez@example.com', 'writer', '2025-03-21T11:53:03', NULL, 1, 3, 0);
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

    INSERT INTO Users (Username, Email, Password, CreateDate, IsActive, Rol, Points)
    VALUES (@Username, @Email, @Password, GETDATE(), 1, @Rol, 0);
END;
GO

--create sp [UpdateUser]
CREATE PROCEDURE [dbo].[UpdateUser]
    @UserId BIGINT,
    @Username NVARCHAR(50),
    @Email NVARCHAR(100),
    @Password NVARCHAR(255),
    @CreateDate DATETIME,
    @LastUpdateDate DATETIME,
    @IsActive BIT,
    @Rol INT,
    @Points BIGINT
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
        Rol = @Rol,
        Points = @Points
    WHERE UserId = @UserId;
END;
GO
