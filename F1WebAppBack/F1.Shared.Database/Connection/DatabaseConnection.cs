using Microsoft.Extensions.Configuration;
using System.Data;
using Microsoft.Data.SqlClient;
using F1.Shared.Database.Connection.Interfaces;

namespace F1.Shared.Database.Connection
{
    public class DatabaseConnection : IDatabaseConnection
    {
        private readonly string? _connectionString;

        public DatabaseConnection(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DDBB");
        }

        public async Task<IDbConnection> GetConnectionAsync()
        {
            var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return connection;
        }
    }
}