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
        public LeagueMember SaveLeagueMember(SaveLeagueMemberRequest leagueMember)
        {
            return leagueRepository.SaveLeagueMember(leagueMember);
        }

        public void DeleteLeagueMember(DeleteLeagueMemberRequest userToDelete)
        {
            leagueRepository.DeleteLeagueMember(userToDelete);
        }

        public UserLeagueData InsertLeagueData(UserLeagueData leagueDataToInsert)
        {
            var insertedLeague = leagueRepository.InsertLeague(leagueDataToInsert.League);

            var saveLeagueMemberRequest = new SaveLeagueMemberRequest();
            saveLeagueMemberRequest.LeagueRecnum = insertedLeague.Recnum;
            saveLeagueMemberRequest.UserRecnum = leagueDataToInsert.LeagueMember.UserRecnum;
            saveLeagueMemberRequest.LeagueRole = leagueDataToInsert.LeagueMember.Role;
            saveLeagueMemberRequest.Sub = leagueDataToInsert.LeagueMember.Sub;
            var insertedLeagueMember = leagueRepository.SaveLeagueMember(saveLeagueMemberRequest);

            var insertedLeagueData = new UserLeagueData();
            insertedLeagueData.League = insertedLeague;
            insertedLeagueData.LeagueMember = insertedLeagueMember;

            return insertedLeagueData;
        }
    }
}
