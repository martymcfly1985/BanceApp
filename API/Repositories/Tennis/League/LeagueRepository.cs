using API.DataAccess;
using API.Services.Configuration;

using System.Data;
using System.Data.SqlClient;


namespace API.Repositories.Tennis.League
{
    public class LeagueRepository : ILeagueRepository
    {
        private string connectionString;

        public LeagueRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public API.Models.Tennis.League GetUserLeagueData(int userRecnum)
        {
            API.Models.Tennis.League league = new API.Models.Tennis.League();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetUserByUsername", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Recnum", SqlDbType.Int).Value = userRecnum;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        league.Recnum = reader.GetInt32("LG_Recnum");
                        league.Name = reader.GetString("LG_Name");
                        league.Public = reader.GetBoolean("LG_Public");
                        league.Joinable = reader.GetBoolean("LG_Joinable");
                        league.City = reader.GetString("LG_City");
                        league.State = reader.GetString("LG_State");
                        league.Playtime = reader.GetString("LG_Playtime");
                        return league;
                    }
                }
            }
            return null;
        }
    }
}
