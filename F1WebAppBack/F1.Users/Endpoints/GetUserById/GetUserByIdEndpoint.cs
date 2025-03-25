using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;
using System.Net;

namespace F1.Users.Endpoints.GetUserByIdEndpoint
{
    public class GetUserByIdEndpoint : EndpointWithoutRequest
    {
        private readonly IGetUserByIdUseCase _getUserByIdUseCase;
        public GetUserByIdEndpoint(IGetUserByIdUseCase getUserByIdUseCase) 
        {
            _getUserByIdUseCase = getUserByIdUseCase;
        }
        public override void Configure()
        {
            Get("/user/{UserId}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            long userId = Route<long>("UserId");

            var user = await _getUserByIdUseCase.GetUserById(userId);

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
