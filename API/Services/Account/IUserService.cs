using API.Models.Account;

namespace API.Services.Account
{
    public interface IUserService
    {
        bool IsUsernameUnique(string username);
        bool IsEmailUnique(string password);
        void SaveNewUser(User user);
    }
}