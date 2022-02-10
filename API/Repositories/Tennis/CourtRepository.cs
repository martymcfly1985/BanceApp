using API.DataAccess;
using API.DataAccess.Models;
using API.Models.Tennis;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Repositories.Tennis
{
    public class CourtRepository : ICourtRepository
    {
        public CourtRepository()
        {

        }

        public List<Court> GetCourts()
        {
            List<Court> courts = new List<Court>();
            using (SqlConnection connection = new SqlConnection(Connection.ConnectionString))
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
                        court.Lights = reader.GetBoolean("C_Lights");
                        courts.Add(court);
                    }
                }
            }

            return courts;
        }
    }
}
