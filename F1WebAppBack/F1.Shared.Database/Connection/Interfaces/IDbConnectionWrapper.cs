using System.Data;

namespace F1.Shared.Database.Connection.Interfaces
{
    public interface IDbConnectionWrapper
    {
        /// <summary>
        /// Execute a store procedure that does not return any value, only the rows affected
        /// </summary>
        /// <param name="conn">The database connection</param>
        /// <param name="sql">The SQL query or stored procedure name</param>
        /// <param name="parameters">The parameters for the query or stored procedure</param>
        /// <param name="transaction">The transaction to use, or null if no transaction is used</param>
        /// <param name="commandTimeOut">The command timeout in seconds, or null to use the default timeout</param>
        /// <param name="commandType">The type of the command (Text, StoredProcedure, etc.)</param>
        /// <returns>The number of rows affected</returns>
        public Task<int> ExecuteAsync(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T">The type of the value to return</typeparam>
        /// <param name="conn">The database connection</param>
        /// <param name="sql">The SQL query or stored procedure name</param>
        /// <param name="parameters">The parameters for the query or stored procedure</param>
        /// <param name="transaction">The transaction to use, or null if no transaction is used</param>
        /// <param name="commandTimeOut">The command timeout in seconds, or null to use the default timeout</param>
        /// <param name="commandType">The type of the command (Text, StoredProcedure, etc.)</param>
        /// <returns>The value returned by the query or stored procedure</returns>
        public Task<T?> ExecuteScalarAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a list of values
        /// </summary>
        /// <typeparam name="T">The type of the values to return</typeparam>
        /// <param name="conn">The database connection</param>
        /// <param name="sql">The SQL query or stored procedure name</param>
        /// <param name="parameters">The parameters for the query or stored procedure</param>
        /// <param name="transaction">The transaction to use, or null if no transaction is used</param>
        /// <param name="commandTimeOut">The command timeout in seconds, or null to use the default timeout</param>
        /// <param name="commandType">The type of the command (Text, StoredProcedure, etc.)</param>
        /// <returns>A list of values returned by the query or stored procedure</returns>
        public Task<IEnumerable<T>> QueryAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T">The type of the value to return</typeparam>
        /// <param name="conn">The database connection</param>
        /// <param name="sql">The SQL query or stored procedure name</param>
        /// <param name="parameters">The parameters for the query or stored procedure</param>
        /// <param name="transaction">The transaction to use, or null if no transaction is used</param>
        /// <param name="commandTimeOut">The command timeout in seconds, or null to use the default timeout</param>
        /// <param name="commandType">The type of the command (Text, StoredProcedure, etc.)</param>
        /// <returns>The first value returned by the query or stored procedure, or the default value if no value is found</returns>
        public Task<T?> QueryFirstOrDefaultAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T">The type of the value to return</typeparam>
        /// <param name="conn">The database connection</param>
        /// <param name="sql">The SQL query or stored procedure name</param>
        /// <param name="parameters">The parameters for the query or stored procedure</param>
        /// <param name="transaction">The transaction to use, or null if no transaction is used</param>
        /// <param name="commandTimeOut">The command timeout in seconds, or null to use the default timeout</param>
        /// <param name="commandType">The type of the command (Text, StoredProcedure, etc.)</param>
        /// <returns>The single value returned by the query or stored procedure</returns>
        public Task<T> QuerySingleAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null);

        /// <summary>
        /// Execute a store procedure that returns a single value
        /// </summary>
        /// <typeparam name="T">The type of the value to return</typeparam>
        /// <param name="conn">The database connection</param>
        /// <param name="sql">The SQL query or stored procedure name</param>
        /// <param name="parameters">The parameters for the query or stored procedure</param>
        /// <param name="transaction">The transaction to use, or null if no transaction is used</param>
        /// <param name="commandTimeOut">The command timeout in seconds, or null to use the default timeout</param>
        /// <param name="commandType">The type of the command (Text, StoredProcedure, etc.)</param>
        /// <returns>The single value returned by the query or stored procedure, or the default value if no value is found</returns>
        public Task<T?> QuerySingleOrDefaultAsync<T>(IDbConnection conn, string sql, object? parameters = null, IDbTransaction? transaction = null, int? commandTimeOut = null, CommandType? commandType = null);
    }
}
