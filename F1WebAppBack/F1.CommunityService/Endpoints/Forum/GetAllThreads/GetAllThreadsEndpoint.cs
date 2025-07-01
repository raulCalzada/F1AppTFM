using F1.CommunityService.Endpoints.Dtos;
using F1.Shared.Application.Community.UseCases.Forum.Interfaces;
using FastEndpoints;

namespace F1.CommunityService.Endpoints.Forum.GetAllThreads
{
    public class GetAllThreadsEndpoint : EndpointWithoutRequest
    {
        private readonly IGetAllForumThreadsUseCase _getAllForumThreadsUseCase;
        public GetAllThreadsEndpoint(IGetAllForumThreadsUseCase getAllForumThreadsUseCase)
        {
            _getAllForumThreadsUseCase = getAllForumThreadsUseCase;
        }
        public override void Configure()
        {
            Get("/forum");
            AllowAnonymous();
        }
        public override async Task HandleAsync(CancellationToken ct)
        {
            var result = await _getAllForumThreadsUseCase.GetAllThreads();
            if (result == null)
            {
                await SendErrorsAsync();
                return;
            }

            var response = result.Select(x => new ForumThreadDto(x));
            await SendOkAsync(response, ct);
        }
    }
}
