using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis.League
{
    public interface ILeagueService
    {
        List<UserLeagueData> GetUserLeagueData(int userRecnum);
        List<LeagueMember> GetLeagueMembers(int leagueRecnum);
        LeagueMember SaveLeagueMember(SaveLeagueMemberRequest leagueMember);
        void UpdateLeague(API.Models.Tennis.League newLeagueValues);
        void DeleteLeagueMember(DeleteLeagueMemberRequest userToDelete);
    }
}