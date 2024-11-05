using API.Models.Account;
using System.Collections.Generic;

namespace API.Services.Account
{
    public interface IUserService
    {
        bool IsUsernameUnique(string username);
        bool IsEmailUnique(string email);
        List<User> SearchUsers(string input);
        string SignIn(SignInInfo signInInfo);
        void SaveNewUser(User user);
        void UpdateUser(User userInformation);
        void SendVerificationEmail(string email);
        bool VerifyAccount(VerificationInformation verificationInformation);
        bool ValidatePassword(SignInInfo userInformation);
        User GetUser(string sessionRecnum);
    }
}