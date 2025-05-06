using F1.Shared.Application.News.Services;
using F1.Shared.Application.News.Services.Interfaces;
using F1.Shared.Application.News.UseCases;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Application.User.Services;
using F1.Shared.Application.User.Services.Interfaces;
using F1.Shared.Application.User.UseCases;
using F1.Shared.Application.User.UseCases.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace F1.Shared.Application
{
    public static class ApplicationLayerExtension
    {
        private static IHostApplicationBuilder AddServices(this IHostApplicationBuilder builder)
        {

            builder.Services
                .AddTransient<IUserService, UserService>()
                .AddTransient<INewsServices, NewsServices>();

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

        public static IHostApplicationBuilder UseApplicationLayer(this IHostApplicationBuilder builder)
        {
            return builder
                .AddUserUseCases()
                .AddNewsUseCases()
                .AddServices();
        }
    }
}
