using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using F1.Shared.Domain.News.Entities.Interfaces;
using FastEndpoints;
using System.Linq;

namespace F1.News.Endpoints.GetLastNews
{
    public class GetLastNewsEndpoint : EndpointWithoutRequest
    {
        private readonly IGetLastNewsUseCase _getLastNewsUseCase;

        public GetLastNewsEndpoint(IGetLastNewsUseCase getLastNewsUseCase)
        {
            _getLastNewsUseCase = getLastNewsUseCase;
        }

        public override void Configure()
        {
            Get("/new/news/{quantity?}"); 
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            int? quantity = null;

            if (HttpContext.Request.RouteValues["quantity"] is string quantityValue && int.TryParse(quantityValue, out var parsedQuantity))
            {
                quantity = parsedQuantity;
            }

            IEnumerable<INew> response;

            response = await _getLastNewsUseCase.GetLastNews(quantity);

            if (response == null)
            {
                await SendNotFoundAsync(ct);
                return;
            }

            var result = response.Select(n => new NewResponse(n)).ToList();

            await SendOkAsync(result, ct);
        }
    }
}
