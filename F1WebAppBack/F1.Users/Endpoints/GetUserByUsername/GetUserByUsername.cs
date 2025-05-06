using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;
using System.Net;

namespace F1.Users.Endpoints.GetUserByUsername
{
    public class GetUserByUsername : EndpointWithoutRequest
    {
        private readonly IGetUserByUsernameUseCase _getUserByUsernameUseCase;

        public GetUserByUsername(IGetUserByUsernameUseCase getUserByUsernameUseCase)
        {
            _getUserByUsernameUseCase = getUserByUsernameUseCase;
        }

        public override void Configure()
        {
            Get("/user/username/{Username}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            string username = Route<string>("Username") ?? string.Empty;

            var user = await _getUserByUsernameUseCase.GetUserByUsername(username);

            if (user == null)
            {
                await SendAsync(null, (int)HttpStatusCode.BadRequest, ct);
            }
            else
            {
                await SendOkAsync(new UserDtoResponse(user));
            }
        }
    }
}
