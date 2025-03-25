using F1.Shared.Database.Connection.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace F1.Shared.Database.Connection
{
    public class DatabaseConnection : IDatabaseConnection
    {
        private const string _connectionString = "Server=localhost\\SQLEXPRESS;Database=master;Trusted_Connection=True;TrustServerCertificate=True;";

        public async Task<IDbConnection> GetConnectionAsync()
        {
            var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return connection;
        }
    }
}
