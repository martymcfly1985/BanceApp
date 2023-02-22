using API.Models.Account;
using API.Repositories.Account;
using System.Security.Cryptography;
using System.Text;

namespace API.Services.Account
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public bool IsUsernameUnique(string username)
        {
            if (userRepository.GetUserByUsername(username) != null)
            {
                return false;
            }
            return true;
        }

        public bool IsEmailUnique(string email)
        {
            if (userRepository.GetUserByEmail(email) != null)
            {
                return false;
            }
            return true;
        }

        public void SaveNewUser(User user)
        {
            string hashedPassword = HashPassword(user.Password);
            user.Password = hashedPassword;
            userRepository.SaveNewUser(user);
        }

        public User GetUserInformation(SignInInfo signInInfo)
        {
            User userData = userRepository.GetUserByUsername(signInInfo.Username);
            if (userData == null || userData.Password != HashPassword(signInInfo.Password))
            {
                return null;
            } 
            else 
            {
                userData.Password = "";
                return userData;
            }
        }

        private string HashPassword(string password)
        {
            // Create a SHA256
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i<bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
