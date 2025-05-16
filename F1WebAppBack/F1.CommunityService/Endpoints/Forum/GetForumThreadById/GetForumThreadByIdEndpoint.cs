using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Forum.GetForumThreadById
{
    public class GetForumThreadByIdEndpoint : EndpointWithoutRequest
    {
        private readonly IGetForumThreadUseCase _getForumThreadUseCase;
        public GetForumThreadByIdEndpoint(IGetForumThreadUseCase getForumThreadUseCase)
        {
            _getForumThreadUseCase = getForumThreadUseCase;
        }
        public override void Configure()
        {
            Get("/forum/{ThreadId}");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            var threadId = Route<int>("ThreadId");
            var result = await _getForumThreadUseCase.GetCompleteThreadForumById(threadId);
            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }
            var response = new ForumThreadDto(result);
            await SendOkAsync(response, ct);
        }
    }
}
