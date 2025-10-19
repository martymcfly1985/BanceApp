using API.Models.Tennis;
using API.Repositories.Tennis.League;
using System.Collections.Generic;

namespace API.Services.Tennis.League
{
    public class LeagueService : ILeagueService
    {
        private readonly ILeagueRepository leagueRepository;
        private readonly ILocationService locationService;
        public LeagueService(ILeagueRepository leagueRepository, ILocationService locationService)
        {
            this.leagueRepository = leagueRepository;
            this.locationService = locationService;
        }
        public List<UserLeagueData> GetUserLeagueData(int userRecnum)
        {
            return leagueRepository.GetUserLeagueData(userRecnum);
        }
        public List<LeagueMember> GetLeagueMembers(int leagueRecnum)
        {
            return leagueRepository.GetLeagueMembers(leagueRecnum);
        }
        public API.Models.Tennis.League GetLeagueByRecnum(int leagueRecnum)
        {
            return leagueRepository.GetLeagueByRecnum(leagueRecnum);
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

        public MasterLeagueIndex GetMasterLeagueIndex(int leagueRecnum)
        {
            var masterLeagueIndex = new MasterLeagueIndex();
            var league = GetLeagueByRecnum(leagueRecnum);

            masterLeagueIndex.Recnum = leagueRecnum;
            masterLeagueIndex.Name = league.Name;
            masterLeagueIndex.Public = league.Public;
            masterLeagueIndex.Joinable = league.Joinable;
            masterLeagueIndex.City = league.City;
            masterLeagueIndex.State = league.State;
            masterLeagueIndex.Playtime = league.Playtime;

            masterLeagueIndex.Members = GetLeagueMembers(leagueRecnum);
            masterLeagueIndex.Locations = locationService.GetLeagueLocations(leagueRecnum);
            
            return masterLeagueIndex;
        }
    }
}
