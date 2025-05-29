using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;
using System.Net;

namespace F1.Users.Endpoints.DeleteUser
{
    public class DeleteUserEndpoint : EndpointWithoutRequest
    {
        private readonly IDeleteUserUseCase _deleteUserUseCase;
        public DeleteUserEndpoint(IDeleteUserUseCase deleteUserUseCase) 
        {
            _deleteUserUseCase = deleteUserUseCase;
        }

        public override void Configure()
        {
            Delete("/user/{UserId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            long userId = Route<long>("UserId");

            var response = await _deleteUserUseCase.DeleteUser(userId);
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
