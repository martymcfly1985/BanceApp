using API.DataAccess;
using API.DataAccess.Models;
using API.Models.Tennis;
using API.Services.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace API.Repositories.Tennis
{
    public class LocationRepository : ILocationRepository
    {
        private string connectionString;

        public LocationRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public int SaveLocation(Location location)
        {
            var locationRecnumInDb = 0;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("SaveLocation", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Name", SqlDbType.VarChar).Value = location.Name;
                command.Parameters.Add("@Address", SqlDbType.VarChar).Value = location.Address;
                command.Parameters.Add("@Hours", SqlDbType.VarChar).Value = location.Hours;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        locationRecnumInDb = reader.GetInt32("recnum");
                    }
                }    
            }
            return locationRecnumInDb;
        }

    }
}
