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
                        userLeagueData.League = GetLeagueFromReader(reader);
                        userLeagueData.LeagueMember = GetLeagueMemberFromReader(reader);
                        userLeagueDataList.Add(userLeagueData);
                    }
                }
            }
            return userLeagueDataList;
        }

        public List<LeagueMember> GetLeagueMembers(int leagueRecnum)
        {
            List<LeagueMember> leagueMembersList = new List<LeagueMember>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetLeagueMembers", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@LeagueRecnum", SqlDbType.Int).Value = leagueRecnum;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        leagueMembersList.Add(GetLeagueMemberFromReader(reader));
                    }
                }
            }
            return leagueMembersList;
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

        public LeagueMember SaveLeagueMember(SaveLeagueMemberRequest leagueMember)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SaveLeagueMember", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@LeagueRecnum", SqlDbType.Int).Value = leagueMember.LeagueRecnum;
                    command.Parameters.Add("@UserRecnum", SqlDbType.Int).Value = leagueMember.UserRecnum;
                    command.Parameters.Add("@Role", SqlDbType.VarChar).Value = leagueMember.LeagueRole;
                    command.Parameters.Add("@Sub", SqlDbType.Bit).Value = leagueMember.Sub;
                    command.Connection.Open();
                    using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                    {
                        while (reader.Read())
                        {
                            return GetLeagueMemberFromReader(reader);
                        }
                    }
                }
            }
            return null;
        }

        public void DeleteLeagueMember(DeleteLeagueMemberRequest userToDelete)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("DeleteLeagueMember", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@UserRecnum", SqlDbType.Int).Value = userToDelete.UserRecnum;
                    command.Parameters.Add("@LeagueRecnum", SqlDbType.Int).Value = userToDelete.LeagueRecnum;
                    command.Connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        public API.Models.Tennis.League InsertLeague(API.Models.Tennis.League leagueToInsert)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("InsertLeague", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@Name", SqlDbType.VarChar).Value = leagueToInsert.Name;
                    command.Parameters.Add("@Public", SqlDbType.Bit).Value = leagueToInsert.Public;
                    command.Parameters.Add("@Joinable", SqlDbType.Bit).Value = leagueToInsert.Joinable;
                    command.Parameters.Add("@City", SqlDbType.VarChar).Value = leagueToInsert.City;
                    command.Parameters.Add("@State", SqlDbType.VarChar).Value = leagueToInsert.State;
                    command.Parameters.Add("@Playtime", SqlDbType.VarChar).Value = leagueToInsert.Playtime;
                    command.Connection.Open();
                    using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                    {
                        while (reader.Read())
                        {
                            return GetLeagueFromReader(reader);
                        }
                    }
                }
            }
            return null;
        }
        private LeagueMember GetLeagueMemberFromReader(EnhancedSqlDataReader reader)
        {
            var leagueMember = new LeagueMember();
            leagueMember.Recnum = reader.GetInt32("LM_Recnum");
            leagueMember.LeagueRecnum = reader.GetInt32("LM_LGRecnum");
            leagueMember.UserRecnum = reader.GetInt32("U_Recnum");
            leagueMember.Role = reader.GetString("LM_Role");
            leagueMember.Sub = reader.GetBoolean("LM_Sub");
            leagueMember.Email = reader.GetString("U_Email");
            leagueMember.FirstName = reader.GetString("U_FirstName");
            leagueMember.LastName = reader.GetString("U_LastName");
            return leagueMember;
        }

        private API.Models.Tennis.League GetLeagueFromReader(EnhancedSqlDataReader reader)
        {
            var league = new API.Models.Tennis.League();
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
