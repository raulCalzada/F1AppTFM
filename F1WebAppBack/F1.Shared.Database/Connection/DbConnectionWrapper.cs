using Dapper;
using F1.Shared.Database.Connection.Interfaces;
using System.Data;

namespace F1.Shared.Database.Connection
{
    internal class DbConnectionWrapper : IDbConnectionWrapper
    {
        public async Task<int> ExecuteAsync(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null)
        {
            return await conn.ExecuteAsync(sql, parameters, transaction, commandTimeOut, commandType);
        }

        public async Task<T?> ExecuteScalarAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null)
        {
            return await conn.ExecuteScalarAsync<T>(sql, parameters, transaction, commandTimeOut, commandType);
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null)
        {
            return await conn.QueryAsync<T>(sql, parameters, transaction, commandTimeOut, commandType);
        }

        public async Task<T?> QueryFirstOrDefaultAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null)
        {
            return await conn.QueryFirstOrDefaultAsync<T>(sql, parameters, transaction, commandTimeOut, commandType);
        }

        public async Task<T> QuerySingleAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null)
        {
            return await conn.QuerySingleAsync<T>(sql, parameters, transaction, commandTimeOut, commandType);
        }

        public async Task<T?> QuerySingleOrDefaultAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null)
        {
            return await conn.QuerySingleAsync<T>(sql, parameters, transaction, commandTimeOut, commandType);
        }
    }
}
