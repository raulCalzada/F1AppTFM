using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;

namespace F1.News.Endpoints.GetCompleteNewById
{
    public class GetCompleteNewByIdEndpoint : EndpointWithoutRequest
    {
        private readonly IGetCompleteNewByIdUseCase _getCompleteNewByIdUseCase;

        public GetCompleteNewByIdEndpoint(IGetCompleteNewByIdUseCase getCompleteNewByIdUseCase)
        {
            _getCompleteNewByIdUseCase = getCompleteNewByIdUseCase;
        }

        public override void Configure()
        {
            Get("/new/{NewId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var newId = Route<long>("NewId");

            var response = await _getCompleteNewByIdUseCase.GetNewById(newId);

            if (response == null)
            {
                await SendNotFoundAsync(ct);
                return;
            }

            await SendOkAsync(new NewResponse(response), ct);
        }
        
    }
}
