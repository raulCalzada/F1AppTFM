using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;
using System.Net;

namespace F1.News.Endpoints.CreateComment
{
    public class CreateCommentEndpoint : Endpoint<CommentRequest, CommentResponse>
    {
        private readonly IAddCommentUseCase _addCommentUseCase;

        public CreateCommentEndpoint(IAddCommentUseCase addCommentUseCase)
        {
            _addCommentUseCase = addCommentUseCase;
        }

        public override void Configure()
        {
            Post("/new/{NewId}/comment");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CommentRequest request, CancellationToken ct)
        {
            var newId = Route<long>("NewId");

            var response = await _addCommentUseCase.AddComment(request.ToDomain(), newId);

            if (response == null)
            {
                await SendErrorsAsync((int)HttpStatusCode.BadRequest, ct);
                return;
            }

            await SendAsync(new CommentResponse(response, newId), (int)HttpStatusCode.Created, ct);
        }
    }
}
