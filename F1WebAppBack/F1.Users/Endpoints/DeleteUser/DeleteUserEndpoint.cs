using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;
using System.Net;

namespace F1.Users.Endpoints.DeleteUser
{
    public class DeleteUserEndpoint : Endpoint<long>
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

        public override async Task HandleAsync(long request, CancellationToken ct)
        {
            var response = await _deleteUserUseCase.DeleteUser(request);
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
