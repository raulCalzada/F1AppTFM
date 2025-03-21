using F1.Shared.Database.Connection.Interfaces;
using System.Data;

namespace F1.Shared.Database.Connection
{
    public class StoreProcedureRepository : IStoreProcedureRepository
    {
        private readonly IDatabaseConnection _databaseConnection;

        private readonly IDbConnectionWrapper _dbConnectionWrapper;

        public StoreProcedureRepository(IDatabaseConnection databaseConnection, IDbConnectionWrapper dbConnectionWrapper)
        {
            _databaseConnection = databaseConnection;
            _dbConnectionWrapper = dbConnectionWrapper;
        }

        public async Task ExecuteAsync(string sql, object? parameters = null, CommandType? commandType = null)
        {
            using var connection = await _databaseConnection.GetConnectionAsync();

            if (connection == null)
            {
                throw new Exception("Connection is null");
            }
            var affectedRows = await _dbConnectionWrapper.ExecuteAsync(connection, sql, parameters, commandType: commandType);

        }

        public async Task<T?> ExecuteScalarAsync<T>(string sql, object? parameters = null, CommandType? commandType = null)
        {
            using var connection = await _databaseConnection.GetConnectionAsync();

            if (connection == null)
            {
                throw new Exception("Connection is null");
            }

            return await _dbConnectionWrapper.ExecuteScalarAsync<T>(connection, sql, parameters, commandType: commandType);
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? parameters = null, CommandType? commandType = null)
        {
            using var connection = await _databaseConnection.GetConnectionAsync();

            if (connection == null)
            {
                throw new Exception("Connection is null");
            }

            return await _dbConnectionWrapper.QueryAsync<T>(connection, sql, parameters, commandType: commandType);
        }

        public async Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? parameters = null, CommandType? commandType = null)
        {
            using var connection = await _databaseConnection.GetConnectionAsync();

            if (connection == null)
            {
                throw new Exception("Connection is null");
            }

            return await _dbConnectionWrapper.QueryFirstOrDefaultAsync<T>(connection, sql, parameters, commandType: commandType);
        }

        public async Task<T> QuerySingleAsync<T>(string sql, object? parameters = null, CommandType? commandType = null)
        {
            using var connection = await _databaseConnection.GetConnectionAsync();

            if (connection == null)
            {
                throw new Exception("Connection is null");
            }

            return await _dbConnectionWrapper.QuerySingleAsync<T>(connection, sql, parameters, commandType: commandType);
        }

        public async Task<T?> QuerySingleOrDefaultAsync<T>(string sql, object? parameters = null, CommandType? commandType = null)
        {
            using var connection = await _databaseConnection.GetConnectionAsync();

            if (connection == null)
            {
                throw new Exception("Connection is null");
            }

            return await _dbConnectionWrapper.QuerySingleOrDefaultAsync<T>(connection, sql, parameters, commandType: commandType);
        }
    }
}
