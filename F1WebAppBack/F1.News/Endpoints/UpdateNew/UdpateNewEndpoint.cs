using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;

namespace F1.News.Endpoints.UpdateNew
{
    public class UdpateNewEndpoint : Endpoint<NewRequest, NewResponse>
    {
        private readonly IUpdateNewUseCase _updateNewUseCase;

        public UdpateNewEndpoint(IUpdateNewUseCase updateNewUseCase)
        {
            _updateNewUseCase = updateNewUseCase;
        }

        public override void Configure()
        {
            Put("/new/{NewId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(NewRequest request, CancellationToken ct)
        {
            var newId = Route<long>("NewId");

            var domainNew = request.ToDomain();
            domainNew.Id = newId;

            var response = await _updateNewUseCase.UpdateNew(domainNew);

            if (response == null)
            {
                await SendNotFoundAsync(ct);
                return;
            }

            await SendOkAsync(new NewResponse(response), ct);
        }
    }
}
