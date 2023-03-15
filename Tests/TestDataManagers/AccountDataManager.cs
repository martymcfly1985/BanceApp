using API.DataAccess;
using API.DataAccess.Models;
using API.Models.Account;
using API.Services.Account;
using System.Collections.Generic;
using System.Data.SqlClient;


namespace Tests.TestDataManagers
{
    public class AccountDataManager : BaseDataManager
    {
        public IUserService UserService => ContainerFactory.Resolve<IUserService>();

        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            using (SqlConnection connection = new SqlConnection(Connection.TestConnectionString))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM [dbo].[User]", connection);
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {

                    while (reader.Read())
                    {
                        var user = new User();
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
                        users.Add(user);
                    }
                }
            } 
            return users;
        }
    }
}
