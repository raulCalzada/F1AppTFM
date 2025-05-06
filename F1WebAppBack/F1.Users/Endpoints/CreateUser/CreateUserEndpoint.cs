using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using F1.Users.Endpoints.CreateUserEndpoint.Dto;
using FastEndpoints;
using System.Net;

namespace F1.Users.Endpoints.CreateUserEndpoint
{
    public class CreateUserEndpoint : Endpoint<CreateUserRequest>
    {
        private readonly ICreateUserUseCase _createUserUseCase;
        public CreateUserEndpoint(ICreateUserUseCase createUserUseCase)
        {
            _createUserUseCase = createUserUseCase;
        }

        public override void Configure()
        {
            Post("/user");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CreateUserRequest request, CancellationToken ct)
        {
            var response = await _createUserUseCase.CreateUser(request.ToDomain());
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
