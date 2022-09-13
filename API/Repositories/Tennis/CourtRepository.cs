using API.DataAccess;
using API.DataAccess.Models;
using API.Models.Tennis;
using API.Services.Configuration;
using System.Collections.Generic;
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

        public List<Court> GetCourts()
        {
            List<Court> courts = new List<Court>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetCourts", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        var court = new Court();
                        court.Recnum = reader.GetInt32("C_Recnum");
                        court.LocationRecnum = reader.GetInt32("C_LRecnum");
                        court.Surface = reader.GetStringValueOrEmptyString("C_Surface");
                        court.Condition = reader.GetStringValueOrEmptyString("C_Condition");
                        court.Lights = reader.IsDBNull("C_Lights") ? false : reader.GetBoolean("C_Lights");
                        court.Name = reader.GetStringValueOrEmptyString("C_Name");
                        courts.Add(court);
                    }
                }
            }

            return courts;
        }
    }
}
