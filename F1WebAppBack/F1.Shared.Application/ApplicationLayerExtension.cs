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
                .AddTransient<IUserService, UserService>();

            return builder;
        }

        private static IHostApplicationBuilder AddUseCases(this IHostApplicationBuilder builder)
        {

            builder.Services
                .AddTransient<IGetUsersUseCase, GetUsersUseCase>();

            return builder;
        }

        public static IHostApplicationBuilder UseApplicationLayer(this IHostApplicationBuilder builder)
        {
            return builder
                .AddUseCases()
                .AddServices();
        }
    }
}
