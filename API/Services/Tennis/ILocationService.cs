using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis
{
    public interface ILocationService
    {
        List<Location> GetLocationInformation();
        List<Location> GetLeagueLocations(int leagueRecnum);
        bool SaveLocation(Location location);
    }
}