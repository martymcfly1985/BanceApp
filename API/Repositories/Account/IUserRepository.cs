
using API.Models.Account;

namespace API.Repositories.Account
{
    public interface IUserRepository
    {
        User GetUserByUsername(string username);
        User GetUserByEmail(string email);
        void SaveNewUser(User newUser);
        void SaveVerificationCode(string email, int verificationCode);

    }
}