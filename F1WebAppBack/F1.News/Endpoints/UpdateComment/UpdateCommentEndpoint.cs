using F1.News.CommonDtos;
using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;

namespace F1.News.Endpoints.UpdateComment
{
    public class UpdateCommentEndpoint : Endpoint<CommentRequest, CommentResponse>
    {
        private readonly IUpdateCommentUseCase _updateCommentUseCase;
        public UpdateCommentEndpoint(IUpdateCommentUseCase updateCommentUseCase)
        {
            _updateCommentUseCase = updateCommentUseCase;
        }
        public override void Configure()
        {
            Put("/new/{NewId}/comment/{CommentId}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CommentRequest request, CancellationToken ct)
        {
            var newId = Route<long>("NewId");
            var commentId = Route<long>("CommentId");

            var comment = request.ToDomain();
            comment.Id = commentId;

            var response = await _updateCommentUseCase.EditComment(comment, newId);

            if (!response)
            {
                await SendNotFoundAsync(ct);
                return;
            }

            await SendOkAsync(ct);
        }
    }
}
