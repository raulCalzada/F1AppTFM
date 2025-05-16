using F1.Shared.Domain.Comunity.Entities.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace F1.Shared.Database.Repositories.Votes.Interfaces
{
    public interface IVotesRepository
    {
        Task Vote(long questionId, int option, long userId);
        Task<IEnumerable<IVote>> GetVotes(long questionId);
        Task DeleteVotes(long questionId, long userId);
    }
}
