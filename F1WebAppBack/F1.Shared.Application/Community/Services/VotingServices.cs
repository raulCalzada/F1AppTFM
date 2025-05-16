using F1.Shared.Application.Community.Services.Interfaces;
using F1.Shared.Database.Repositories.Votes.Interfaces;
using F1.Shared.Domain.Comunity.Entities.Interfaces;
using F1.Shared.Domain.Comunity.Enums;

namespace F1.Shared.Application.Community.Services
{
    class VotingServices : IVotingServices
    {
        private readonly IVotesRepository _votesRepository;
        private readonly IVoteOptionsRepository _voteOptionsRepository;
        private readonly IVoteQuestionsRepository _voteQuestionsRepository;

        public VotingServices(IVotesRepository votesRepository, IVoteOptionsRepository voteOptionsRepository, IVoteQuestionsRepository voteQuestionsRepository)
        {
            _votesRepository = votesRepository;
            _voteOptionsRepository = voteOptionsRepository;
            _voteQuestionsRepository = voteQuestionsRepository;
        }

        public async Task ChangeVoteStatus(long questionId, VotingStatus state)
        {
            await _voteQuestionsRepository.ChangeVoteStatus(questionId, state);
        }

        public async Task CreateVote(IVoteQuestion voteQ)
        {
            await _voteQuestionsRepository.CreateVoteQuestion(voteQ.Question, voteQ.Options, voteQ.State);

            foreach (var (option, pos) in voteQ.Options.Select((option, index) => (option, index)))
            {
                await _voteOptionsRepository.CreateVoteOption(voteQ.Id, pos, option);
            }
        }

        public async Task Vote(long questionId, long userId, int option)
        {
            await _votesRepository.Vote(questionId, option, userId);
        }

        public async Task<IEnumerable<IVote>> GetVotes(long questionId)
        {
            return await _votesRepository.GetVotes(questionId);
        }

        public async Task<IEnumerable<IVoteQuestion>> GetAllVoteQuestions()
        {
            return await _voteQuestionsRepository.GetAllVoteQuestions();
        }

        public async Task<IVoteQuestion?> GetVotesAndQuestion(long questionId)
        {
            var voteQuestion = await _voteQuestionsRepository.GetVoteQuestion(questionId);

            if (voteQuestion == null)
            {
                return null;
            }

            voteQuestion.Options = await _voteOptionsRepository.GetVoteOptions(questionId);
            voteQuestion.Votes = await GetVotes(questionId);

            return voteQuestion;
        }

        public async Task DeleteVotesAndQuestion(IVoteQuestion voteQ)
        {
            foreach (var vote in voteQ.Votes)
            {
                await _votesRepository.DeleteVotes(voteQ.Id, vote.User.Id);
            }

            for(int i = 0; i < voteQ.Options.Count(); i++)
            {
                await _voteOptionsRepository.DeleteVoteOption(voteQ.Id, i);
            }

            await _voteQuestionsRepository.DeleteVoteQuestion(voteQ.Id);
        }
    }
}
