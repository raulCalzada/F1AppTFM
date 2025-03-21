using System.Data;

namespace F1.Shared.Database.Connection.Interfaces
{
    public interface IDatabaseConnection
    {
        public Task<IDbConnection> GetConnectionAsync();
    }
}
