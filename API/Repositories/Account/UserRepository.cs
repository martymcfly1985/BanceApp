using API.DataAccess;
using System.Data;
using System.Data.SqlClient;
using API.Models.Account;
using API.Services.Configuration;


namespace API.Repositories.Account
{
    public class UserRepository : IUserRepository
    {
        private string connectionString;
        public UserRepository(IApplicationConfiguration config)
        {
            connectionString = config.ConnectionString;
        }

        public User GetUserByUsername(string username)
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
                        return GetUserDataFromDb(reader);
                    }
                }
            }
            return null;
        }

        public void SaveNewUser(User newUser)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand("SaveUser", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@Username", SqlDbType.VarChar).Value = newUser.Username;
                    command.Parameters.Add("@Email", SqlDbType.VarChar).Value = newUser.Email;
                    command.Parameters.Add("@Password", SqlDbType.VarChar).Value = newUser.Password;
                    command.Parameters.Add("@FirstName", SqlDbType.VarChar).Value = newUser.FirstName;
                    command.Parameters.Add("@LastName", SqlDbType.VarChar).Value = newUser.LastName;
                    command.Parameters.Add("@Verified", SqlDbType.Bit).Value = newUser.Verified;
                    command.Parameters.Add("@Leagues", SqlDbType.VarChar).Value = newUser.Leagues;
                    command.Parameters.Add("@Role", SqlDbType.Int).Value = newUser.Role;
                    command.Parameters.Add("@Public", SqlDbType.Bit).Value = newUser.Public;
                    command.Parameters.Add("@City", SqlDbType.VarChar).Value = newUser.City;
                    command.Parameters.Add("@State", SqlDbType.VarChar).Value = newUser.State;
                    command.Parameters.Add("@SkillLevel", SqlDbType.Decimal).Value = newUser.SkillLevel;
                    command.Connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        public User GetUserByEmail(string email)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand("GetUserByEmail", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@Email", SqlDbType.VarChar).Value = email;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        return GetUserDataFromDb(reader);
                    }
                }
            }
            return null;
        }

        private User GetUserDataFromDb(EnhancedSqlDataReader reader)
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
            return user;
        }
    }
}
