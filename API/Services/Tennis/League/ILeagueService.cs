using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis.League
{
    public interface ILeagueService
    {
        List<UserLeagueData> GetUserLeagueData(int userRecnum);
        List<LeagueMember> GetLeagueMembers(int leagueRecnum);
        void UpdateLeague(API.Models.Tennis.League newLeagueValues);
        void AddNewLeagueMember(AddLeagueMemberRequest newMember);
    }
}