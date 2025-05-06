using F1.Shared.Database.Connection;
using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.News;
using F1.Shared.Database.Repositories.News.Interfaces;
using F1.Shared.Database.Repositories.Users;
using F1.Shared.Database.Repositories.Users.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace F1.Shared.Database
{
    public static class DatabaseLayerExtension
    {
        public static IHostApplicationBuilder AddRepositories(this IHostApplicationBuilder builder)
        {
            //Registering the repositories
            builder.Services
                .AddScoped<IUserRepository, UsersRepository>()
                .AddScoped<INewsRespository, NewsRespository>()
                .AddScoped<INewsCommentsRepository, NewsCommentsRepository>();

            return builder;
        }

        public static IHostApplicationBuilder AddDatabaseConnections(this IHostApplicationBuilder builder)
        {
            builder.Services
                .AddScoped<IDatabaseConnection, DatabaseConnection>()
                .AddScoped<IDbConnectionWrapper, DbConnectionWrapper>()
                .AddScoped<IStoreProcedureRepository, StoreProcedureRepository>();
            return builder;
        }

        public static IHostApplicationBuilder UseDatabaseLayer(this IHostApplicationBuilder builder)
        {

            builder
                .AddDatabaseConnections()
                .AddRepositories();

            return builder;
        }
    }
}
