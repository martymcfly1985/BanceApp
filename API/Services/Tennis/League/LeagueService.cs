using API.Repositories.Tennis.League;

namespace API.Services.Tennis.League
{
    public class LeagueService : ILeagueService
    {
        private readonly ILeagueRepository leagueRepository;
        public LeagueService(ILeagueRepository leagueRepository)
        {
            this.leagueRepository = leagueRepository;
        }
        public API.Models.Tennis.League GetUserLeagueData(int userRecnum)
        {
            return leagueRepository.GetUserLeagueData(userRecnum);
        }
    }
}
