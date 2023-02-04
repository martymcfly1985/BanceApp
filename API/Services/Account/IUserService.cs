namespace API.Services.User
{
    public interface IUserService
    {
        bool IsUsernameUnique(string username);
    }
}