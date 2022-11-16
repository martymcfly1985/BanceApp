using API.Models.Tennis;
using API.Services.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace API.Repositories.Tennis
{
    public class CourtRepository : ICourtRepository
    {
        private string connectionString;

        public CourtRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public void SaveCourt(Court court)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SaveCourt", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@Name", SqlDbType.VarChar).Value = court.Name;
                    command.Parameters.Add("@Lights", SqlDbType.Bit).Value = court.Lights;
                    command.Parameters.Add("@Surface", SqlDbType.VarChar).Value = court.Surface;
                    command.Parameters.Add("@Condition", SqlDbType.Int).Value = court.Condition;
                    command.Parameters.Add("@LocationRecnum", SqlDbType.Int).Value = court.LocationRecnum;
                    command.Connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        } 
    }
}
