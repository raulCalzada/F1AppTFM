using System.Data;

namespace F1.Shared.Database.Connection.Interfaces
{
    public interface IStoreProcedureRepository
    {
        /// <summary>
        /// Execute a store procedure that does not return any value
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public Task ExecuteAsync(string sql, object? parameters = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public Task<T?> ExecuteScalarAsync<T>(string sql, object? parameters = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a list of values
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public Task<IEnumerable<T>> QueryAsync<T>(string sql, object? parameters = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? parameters = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public Task<T?> QuerySingleAsync<T>(string sql, object? parameters = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="commandType"></param>
        /// <returns></returns>
        public Task<T?> QuerySingleOrDefaultAsync<T>(string sql, object? parameters = null, CommandType? commandType = null);
    }
}
