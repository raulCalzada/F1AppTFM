# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY F1.News ./F1.News
COPY F1.Shared.Application ./F1.Shared.Application
COPY F1.Shared.Database ./F1.Shared.Database
COPY F1.Shared.Domain ./F1.Shared.Domain

WORKDIR /src/F1.News

# Restore only the main project (skip .sln and test projects)
RUN dotnet restore F1.News.csproj
RUN dotnet publish F1.News.csproj -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish ./
EXPOSE 80
ENTRYPOINT ["dotnet", "F1.News.dll"]