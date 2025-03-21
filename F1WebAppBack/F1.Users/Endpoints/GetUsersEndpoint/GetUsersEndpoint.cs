using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;

namespace F1.Users.Endpoints.GetUsers
{
    public class GetUsersEndpoint : Endpoint<EmptyRequest, List<UserDto>>
    {
        private readonly IGetUsersByIdUseCase _getUsersUseCase;

        public GetUsersEndpoint(IGetUsersByIdUseCase getUsersUseCase) 
        {
            _getUsersUseCase = getUsersUseCase;
        }
        public override void Configure()
        {
            Get("/user");
            AllowAnonymous();
            Version(1); 
        }

        public override async Task HandleAsync(EmptyRequest request, CancellationToken ct)
        {
            var users = await _getUsersUseCase.GetUsers();

            var response = users.Select(user => new UserDto(user)).ToList();

            await SendOkAsync(response);
        }
    }
}
