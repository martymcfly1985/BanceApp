using API.Models.Account;

namespace API.Services.Account
{
    public interface IUserService
    {
        bool IsUsernameUnique(string username);
        bool IsEmailUnique(string email);
        User GetUserInformation(SignInInfo signInInfo);
        void SaveNewUser(User user);
    }
}