using API.Models.Tennis;
using API.Repositories.Tennis.League;
using System.Collections.Generic;

namespace API.Services.Tennis.League
{
    public class LeagueService : ILeagueService
    {
        private readonly ILeagueRepository leagueRepository;
        public LeagueService(ILeagueRepository leagueRepository)
        {
            this.leagueRepository = leagueRepository;
        }
        public List<UserLeagueData> GetUserLeagueData(int userRecnum)
        {
            return leagueRepository.GetUserLeagueData(userRecnum);
        }
        public List<LeagueMember> GetLeagueMembers(int leagueRecnum)
        {
            return leagueRepository.GetLeagueMembers(leagueRecnum);
        }
        public void UpdateLeague(API.Models.Tennis.League newLeagueValues)
        {
            leagueRepository.UpdateLeague(newLeagueValues);
        }
        public LeagueMember AddNewLeagueMember(AddLeagueMemberRequest newMember)
        {
            return leagueRepository.AddNewLeagueMember(newMember);
        }

        public void DeleteLeagueMember(DeleteLeagueMemberRequest userToDelete)
        {
            leagueRepository.DeleteLeagueMember(userToDelete);
        }
    }
}
