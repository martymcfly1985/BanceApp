
namespace API.Repositories.Tennis.League
{
    public interface ILeagueRepository
    {
        Models.Tennis.League GetUserLeagueData(int userRecnum);
    }
}