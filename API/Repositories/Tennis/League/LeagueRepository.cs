using API.DataAccess;
using API.Models.Tennis;
using API.Services.Configuration;
using System.Collections.Generic;
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

        public List<UserLeagueData> GetUserLeagueData(int userRecnum)
        {
            List<UserLeagueData> userLeagueDataList = new List<UserLeagueData>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetUserLeagueData", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Recnum", SqlDbType.Int).Value = userRecnum;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        UserLeagueData userLeagueData = new UserLeagueData();
                        var league = new API.Models.Tennis.League();
                        var leagueMember = new LeagueMember();
                        league.Recnum = reader.GetInt32("LG_Recnum");
                        league.Name = reader.GetString("LG_Name");
                        league.Public = reader.GetBoolean("LG_Public");
                        league.Joinable = reader.GetBoolean("LG_Joinable");
                        league.City = reader.GetString("LG_City");
                        league.State = reader.GetString("LG_State");
                        league.Playtime = reader.GetString("LG_Playtime");
                        leagueMember.Recnum = reader.GetInt32("LM_Recnum");
                        leagueMember.LeagueRecnum = reader.GetInt32("LM_LGRecnum");
                        leagueMember.UserRecnum = reader.GetInt32("LM_URecnum");
                        leagueMember.Role = reader.GetString("LM_Role");
                        leagueMember.Sub = reader.GetBoolean("LM_Sub");
                        userLeagueData.League = league;
                        userLeagueData.LeagueMember = leagueMember;
                        userLeagueDataList.Add(userLeagueData);
                    }
                }
            }
            return userLeagueDataList;
        }

        public void UpdateLeague(API.Models.Tennis.League newLeagueValues)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("UpdateLeague", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@Recnum", SqlDbType.Int).Value = newLeagueValues.Recnum;
                    command.Parameters.Add("@Name", SqlDbType.VarChar).Value = newLeagueValues.Name;
                    command.Parameters.Add("@Public", SqlDbType.Bit).Value = newLeagueValues.Public;
                    command.Parameters.Add("@Joinable", SqlDbType.Bit).Value = newLeagueValues.Joinable;
                    command.Parameters.Add("@City", SqlDbType.VarChar).Value = newLeagueValues.City;
                    command.Parameters.Add("@State", SqlDbType.VarChar).Value = newLeagueValues.State;
                    command.Parameters.Add("@Playtime", SqlDbType.VarChar).Value = newLeagueValues.Playtime;
                    command.Connection.Open();
                    command.ExecuteNonQuery();
                } 
            }
        }
    }
}
