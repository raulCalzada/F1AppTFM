using F1.CommunityService.Endpoints.Dtos;
using F1.CommunityService.Endpoints.Forum.CreateComment.Request;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Forum.CreateComment
{
    public class CreateCommentEndpoint : Endpoint<CreateForumCommentRequest>
    {
        private readonly ICreateForumCommentUseCase _createForumCommentUseCase;

        public CreateCommentEndpoint(ICreateForumCommentUseCase createForumCommentUseCase)
        {
            _createForumCommentUseCase = createForumCommentUseCase;
        }

        public override void Configure()
        {
            Post("/forum/comment");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CreateForumCommentRequest request, CancellationToken ct)
        {
            var result = await _createForumCommentUseCase.CreateForumComment(request.Content, request.UserId, request.ThreadId);

            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }
            await SendOkAsync(new ForumThreadDto(result), ct);
        }
    }
}
