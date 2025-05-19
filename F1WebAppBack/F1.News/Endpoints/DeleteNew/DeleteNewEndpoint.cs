using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;

namespace F1.News.Endpoints.DeleteNew
{
    public class DeleteNewEndpoint : EndpointWithoutRequest
    {
        private readonly IDeleteNewUseCase _deleteNewUseCase;

        public DeleteNewEndpoint(IDeleteNewUseCase deleteNewUseCase)
        {
            _deleteNewUseCase = deleteNewUseCase;
        }

        public override void Configure()
        {
            Delete("/new/{NewId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var newId = Route<long>("NewId");

            var response = await _deleteNewUseCase.DeleteNew(newId);

            if (response == null)
            {
                await SendNotFoundAsync(ct);
                return;
            }
            await SendOkAsync(new NewResponse(response),ct);
        }
    }
}
