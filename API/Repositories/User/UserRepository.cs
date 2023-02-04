using API.DataAccess;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Models.User;
using API.Services.Configuration;

namespace API.Repositories.User
{
    public class UserRepository : IUserRepository
    {
        private string connectionString;
        public UserRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public Models.User.User GetUserByUsername(string username)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetUserByUsername", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Username", SqlDbType.VarChar).Value = username;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        var user = new Models.User.User();
                        user.Recnum = reader.GetInt32("U_Recnum");
                        user.Username = reader.GetString("U_Username");
                        user.Password = reader.GetString("U_Password");
                        user.Email = reader.GetString("U_Email");
                        user.FirstName = reader.GetString("U_FirstName");
                        user.LastName = reader.GetString("U_LastName");
                        user.City = reader.GetString("U_City");
                        user.State = reader.GetString("U_State");
                        user.Role = (Role)reader.GetInt32("U_Role");
                        user.Leagues = reader.GetStringValueOrEmptyString("U_Leagues");
                        user.Verified = reader.GetBoolean("U_Verified");
                        user.Public = reader.GetBoolean("U_Public");
                        user.SkillLevel = reader.IsDBNull("U_SkillLevel") ? 0 : reader.GetDecimal("U_SkillLevel");
                        return user;
                    }
                }
            }
            return null;
        }
    }
}
