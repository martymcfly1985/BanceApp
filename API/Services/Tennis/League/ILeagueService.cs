using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis.League
{
    public interface ILeagueService
    {
        List<UserLeagueData> GetUserLeagueData(int userRecnum);
    }
}