﻿using F1.Shared.Database.Connection;
using F1.Shared.Database.Connection.Interfaces;
using F1.Shared.Database.Repositories.Forum;
using F1.Shared.Database.Repositories.Forum.Interfaces;
using F1.Shared.Database.Repositories.News;
using F1.Shared.Database.Repositories.News.Interfaces;
using F1.Shared.Database.Repositories.Quiz;
using F1.Shared.Database.Repositories.Quiz.Interfaces;
using F1.Shared.Database.Repositories.Users;
using F1.Shared.Database.Repositories.Users.Interfaces;
using F1.Shared.Database.Repositories.Votes;
using F1.Shared.Database.Repositories.Votes.Interfaces;
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
                .AddScoped<INewsCommentsRepository, NewsCommentsRepository>()

                .AddScoped<IForumThreadCommentRepository, ForumThreadCommentRepository>()
                .AddScoped<IForumThreadRepository, ForumThreadRepository>()

                .AddScoped<IVoteOptionsRepository, VoteOptionsRepository>()
                .AddScoped<IVoteQuestionsRepository, VoteQuestionsRepository>()
                .AddScoped<IVotesRepository, VotesRepository>()

                .AddScoped<IQuizzesRepository, QuizzesRepository>()
                .AddScoped<IQuizQuestionsRepository, QuizQuestionsRepository>()
                .AddScoped<IQuizAnswersRepository, QuizAnswersRepository>()
                .AddScoped<IQuizResultsRepository, QuizResultsRepository>();

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
