using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;
using System.Net;

namespace F1.Users.Endpoints.UpdateUserEndpoint
{
    public class UpdateUserEndpoint : Endpoint<UserDtoRequest>
    {
        private readonly IUpdateUserUseCase _updateUserUseCase;

        public UpdateUserEndpoint(IUpdateUserUseCase updateUserUseCase)
        {
            _updateUserUseCase = updateUserUseCase;
        }
        public override void Configure()
        {
            Post("/user/{UserId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(UserDtoRequest request, CancellationToken ct)
        {
            var response = await _updateUserUseCase.UpdateUser(request.ToDomain());

            if (response == null)
            {
                await SendAsync(null, (int)HttpStatusCode.BadRequest, ct);
            }
            else
            {
                await SendOkAsync(new UserDtoResponse(response));
            }
        }
    }
}
