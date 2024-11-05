
using API.Models.Account;
using System.Collections.Generic;

namespace API.Repositories.Account
{
    public interface IUserRepository
    {
        User GetUserByUsername(string username);
        User GetUserByEmail(string email);
        List<User> SearchUsers(string input);
        void SaveNewUser(User newUser);
        void UpdateUser(User userInformation);
        void SaveVerificationCode(string email, int verificationCode);
        bool VerifyAccount(VerificationInformation verificationInformation);
        string CreateSessionRecnum(int recnum);
        User GetUserBySessionRecnum(string sessionRecnum);
    }
}