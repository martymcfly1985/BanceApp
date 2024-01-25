using API.Models.Account;

namespace API.Services.Account
{
    public interface IUserService
    {
        bool IsUsernameUnique(string username);
        bool IsEmailUnique(string email);
        string SignIn(SignInInfo signInInfo);
        void SaveNewUser(User user);
        void SendVerificationEmail(string email);
        bool VerifyAccount(VerificationInformation verificationInformation);
    }
}