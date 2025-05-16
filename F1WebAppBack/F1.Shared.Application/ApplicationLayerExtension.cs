using F1.Shared.Application.News.Services;
using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Application.User.Services;
using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases;
using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Shared.Application.Community.UseCases.Forum;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using F1.Shared.Application.Community.UseCases.Voting;
using F1.Shared.Application.Community.UseCases.Voting.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Application.Community.Services;

namespace F1.Shared.Application
{
    public static class ApplicationLayerExtension
    {
        private static IHostApplicationBuilder AddServices(this IHostApplicationBuilder builder)
        {
            builder.Services
                .AddTransient<IUserService, UserService>()
                .AddTransient<INewsServices, NewsServices>()
                .AddTransient<IForumServices, ForumServices>()
                .AddTransient<IVotingServices, VotingServices>();

            return builder;
        }

        private static IHostApplicationBuilder AddUserUseCases(this IHostApplicationBuilder builder)
        {
            builder.Services
                .AddTransient<ICreateUserUseCase, CreateUserUseCase>()
                .AddTransient<IUpdateUserUseCase, UpdateUserUseCase>()
                .AddTransient<IDeleteUserUseCase, DeleteUserUseCase>()
                .AddTransient<IGetAllUsersUseCase, GetAllUsersUseCase>()
                .AddTransient<IGetUserByIdUseCase, GetUserByIdUseCase>()
                .AddTransient<IGetUserByUsernameUseCase, GetUserByUsernameUseCase>();

            return builder;
        }

        private static IHostApplicationBuilder AddNewsUseCases(this IHostApplicationBuilder builder)
        {
            builder.Services
                .AddTransient<IAddCommentUseCase, AddCommentUseCase>()
                .AddTransient<ICreateNewUseCase, CreateNewUseCase>()
                .AddTransient<IDeleteCommentUseCase, DeleteCommentUseCase>()
                .AddTransient<IDeleteNewUseCase, DeleteNewUseCase>()
                .AddTransient<IGetCompleteNewByIdUseCase, GetCompleteNewByIdUseCase>()
                .AddTransient<IGetLastNewsUseCase, GetLastNewsUseCase>()
                .AddTransient<IUpdateCommentUseCase, UpdateCommentUseCase>()
                .AddTransient<IUpdateNewUseCase, UpdateNewUseCase>();
            return builder;
        }

        private static IHostApplicationBuilder AddForumUseCases(this IHostApplicationBuilder builder)
        {
            builder.Services
                .AddTransient<ICreateForumCommentUseCase, CreateForumCommentUseCase>()
                .AddTransient<ICreateForumThreadUseCase, CreateForumThreadUseCase>()
                .AddTransient<IDeleteForumThreadUseCase, DeleteForumThreadUseCase>()
                .AddTransient<IDeleteForumCommentUseCase, DeleteForumCommentUseCase>()
                .AddTransient<IGetAllForumThreadsUseCase, GetAllForumThreadsUseCase>()
                .AddTransient<IGetForumThreadUseCase, GetForumThreadUseCase>();
            return builder;
        }

        private static IHostApplicationBuilder AddVotingUseCases(this IHostApplicationBuilder builder)
        {
            builder.Services
                .AddTransient<IChangeVoteStatusUseCase, ChangeVoteStatusUseCase>()
                .AddTransient<ICreateVoteUseCase, CreateVoteUseCase>()
                .AddTransient<IDeleteVotationUseCase, DeleteVotationUseCase>()
                .AddTransient<IGetVoteUseCase, GetVoteUseCase>()
                .AddTransient<IGetAllVotesUseCase, GetAllVotesUseCase>()
                .AddTransient<IVoteUseCase, VoteUseCase>();
            return builder;
        }

        public static IHostApplicationBuilder UseApplicationLayer(this IHostApplicationBuilder builder)
        {
            return builder
                .AddUserUseCases()
                .AddNewsUseCases()
                .AddForumUseCases()
                .AddVotingUseCases()
                .AddServices();
        }
    }
}
