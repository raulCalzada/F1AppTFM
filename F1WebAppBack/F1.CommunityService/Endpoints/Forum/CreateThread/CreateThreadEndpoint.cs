using F1.CommunityService.Endpoints.Dtos;
using F1.CommunityService.Endpoints.Forum.CreateThread.Request;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Forum.CreateThread
{
    public class CreateThreadEndpoint : Endpoint<CreateForumRequest, ForumThreadDto>
    {
        private readonly ICreateForumThreadUseCase _createForumThreadUseCase;

        public CreateThreadEndpoint(ICreateForumThreadUseCase createForumThreadUseCase)
        {
            _createForumThreadUseCase = createForumThreadUseCase;
        }
        public override void Configure()
        {
            Post("/forum");
            AllowAnonymous();
        }

        public override async Task HandleAsync(CreateForumRequest request, CancellationToken ct)
        {
            var result = await _createForumThreadUseCase.CreateThread(request.Title, request.Content, request.UserId);

            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }

            await SendOkAsync(new ForumThreadDto(result), ct);
        }
    }
}
