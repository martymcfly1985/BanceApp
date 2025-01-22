
using API.Models.Account;
using System.Collections.Generic;

namespace API.Repositories.Account
{
    public interface IUserRepository
    {
        User GetUserByUsername(string username);
        User GetUserByEmail(string email);
        List<User> SearchUsersNotInLeague(string input, int leagueRecnum);
        void SaveNewUser(User newUser);
        void UpdateUser(User userInformation);
        void SaveVerificationCode(string email, int verificationCode);
        bool VerifyAccount(VerificationInformation verificationInformation);
        string CreateSessionRecnum(int recnum);
        User GetUserBySessionRecnum(string sessionRecnum);
    }
}