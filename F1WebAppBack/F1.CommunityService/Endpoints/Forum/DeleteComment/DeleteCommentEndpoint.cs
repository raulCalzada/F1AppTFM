using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Forum.DeleteComment
{
    public class DeleteCommentEndpoint : EndpointWithoutRequest
    {
        private readonly IDeleteForumCommentUseCase _deleteForumCommentUseCase;

        public DeleteCommentEndpoint(IDeleteForumCommentUseCase deleteForumCommentUseCase)
        {
            _deleteForumCommentUseCase = deleteForumCommentUseCase;
        }

        public override void Configure()
        {
            Delete("/forum/comment/{CommentId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var commentId = Route<long>("CommentId");

            await _deleteForumCommentUseCase.DeleteComment(commentId);

            await SendNoContentAsync(ct);
        }

    }
}
