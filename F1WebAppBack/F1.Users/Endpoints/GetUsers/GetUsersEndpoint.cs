using F1.Shared.Application.User.UseCases.Interfaces;
using F1.Users.Endpoints.CommonDtos;
using FastEndpoints;

namespace F1.Users.Endpoints.GetUsers
{
    public class GetUsersEndpoint : Endpoint<EmptyRequest, List<UserDtoResponse>>
    {
        private readonly IGetAllUsersUseCase _getUsersUseCase;

        public GetUsersEndpoint(IGetAllUsersUseCase getUsersUseCase) 
        {
            _getUsersUseCase = getUsersUseCase;
        }
        public override void Configure()
        {
            Get("/user");
            AllowAnonymous();
        }

        public override async Task HandleAsync(EmptyRequest request, CancellationToken ct)
        {
            var users = await _getUsersUseCase.GetUsers();

            var response = users.Select(user => new UserDtoResponse(user)).ToList();

            await SendOkAsync(response);
        }
    }
}
