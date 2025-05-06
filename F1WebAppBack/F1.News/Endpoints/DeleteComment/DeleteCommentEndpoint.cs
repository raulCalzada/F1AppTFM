using F1.Shared.Application.News.UseCases.Interfaces;
using FastEndpoints;

namespace F1.News.Endpoints.DeleteComment
{
    public class DeleteCommentEndpoint : EndpointWithoutRequest
    {
        private readonly IDeleteCommentUseCase _deleteCommentUseCase;

        public DeleteCommentEndpoint(IDeleteCommentUseCase deleteCommentUseCase)
        {
            _deleteCommentUseCase = deleteCommentUseCase;
        }
        public override void Configure()
        {
            Delete("/new/{NewId}/comment/{CommentId}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            var articleId = Route<long>("NewId");
            var commentId = Route<long>("CommentId");

            var response = await _deleteCommentUseCase.DeleteComment(commentId, articleId);

            if (!response)
            {
                await SendNotFoundAsync(ct);
                return;
            }

            await SendOkAsync(ct);
        }
    }
}
