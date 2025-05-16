using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Forum.DeleteThread
{
    public class DeleteThreadEndpoint : EndpointWithoutRequest
    {
        private readonly IDeleteForumThreadUseCase _deleteForumThreadUseCase;

        public DeleteThreadEndpoint(IDeleteForumThreadUseCase deleteForumThreadUseCase)
        {
            _deleteForumThreadUseCase = deleteForumThreadUseCase;
        }

        public override void Configure()
        {
            Delete("/forum/{ThreadId}");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CancellationToken ct)
        {
            var threadId = Route<int>("ThreadId");
            var response = await _deleteForumThreadUseCase.DeleteThread(threadId);

            if (!response)
            {
                await SendErrorsAsync();
                return;
            }

            await SendNoContentAsync(ct);
        }
    }
}
