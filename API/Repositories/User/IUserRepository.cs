
namespace API.Repositories.User
{
    public interface IUserRepository
    {
        Models.User.User GetUserByUsername(string username);
    }
}