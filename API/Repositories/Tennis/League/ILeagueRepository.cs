﻿
using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Repositories.Tennis.League
{
    public interface ILeagueRepository
    {
        List<UserLeagueData> GetUserLeagueData(int userRecnum);
        List<LeagueMember> GetLeagueMembers(int leagueRecnum);
        LeagueMember SaveLeagueMember(SaveLeagueMemberRequest leagueMember);
        void UpdateLeague(API.Models.Tennis.League newLeagueValues);
        void DeleteLeagueMember(DeleteLeagueMemberRequest userToDelete);
        API.Models.Tennis.League InsertLeague(API.Models.Tennis.League leagueToInsert);
    }
}