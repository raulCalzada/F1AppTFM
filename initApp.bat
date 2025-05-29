@echo off
echo ====================================
echo Starting SQL Server with Docker Compose
echo ====================================

REM Start Docker container in detached mode
echo build docker-compose
docker-compose build --no-cache

echo docker compose up
docker-compose up -d

REM Wait for SQL Server to finish starting
echo Waiting 10 seconds for SQL Server to start...
timeout /t 10 /nobreak >nul

echo ====================================
echo Executing SQL scripts in SQL Server
echo ====================================

REM Relative path to SQL scripts (inside current working directory)
set SCRIPT_DIR=SQL

REM SQL Server credentials
set SERVER=localhost,1433
set USER=sa
set PASSWORD=Admin123!

REM Execute each script one by one
echo Running 1.SQLUsers.sql...
sqlcmd -S %SERVER% -U %USER% -P %PASSWORD% -i "%SCRIPT_DIR%\1.SQLUsers.sql"

echo Running 2.SQLNews.sql...
sqlcmd -S %SERVER% -U %USER% -P %PASSWORD% -i "%SCRIPT_DIR%\2.SQLNews.sql"

echo Running 3.SQLForum.sql...
sqlcmd -S %SERVER% -U %USER% -P %PASSWORD% -i "%SCRIPT_DIR%\3.SQLForum.sql"

echo Running 4.SQLVotes.sql...
sqlcmd -S %SERVER% -U %USER% -P %PASSWORD% -i "%SCRIPT_DIR%\4.SQLVotes.sql"

echo ====================================
echo Scripts executed successfully.
pause
