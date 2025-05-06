using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;

namespace F1.News.Endpoints.CreateNew
{
    public class CreateNewUseEndpoint : Endpoint<NewRequest, NewResponse>
    {
        private readonly ICreateNewUseCase _createNewUseCase;

        public CreateNewUseEndpoint(ICreateNewUseCase createNewUseCase)
        {
            _createNewUseCase = createNewUseCase;
        }

        public override void Configure()
        {
            Post("/new");
            AllowAnonymous();
        }

        public override async Task HandleAsync(NewRequest request, CancellationToken ct)
        {
            var response = await _createNewUseCase.CreateNew(request.ToDomain());

            if (response == null)
            {
                await SendErrorsAsync(400, ct);
                return;
            }

            await SendCreatedAtAsync<CreateNewUseEndpoint>(null, new NewResponse(response), null, 201, false, ct);
        }
    }
}
