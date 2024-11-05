
using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Repositories.Tennis.League
{
    public interface ILeagueRepository
    {
        List<UserLeagueData> GetUserLeagueData(int userRecnum);
        List<LeagueMember> GetLeagueMembers(int leagueRecnum);
        void UpdateLeague(API.Models.Tennis.League newLeagueValues);
        void AddNewLeagueMember(AddLeagueMemberRequest newMember);
    }
}