using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Repositories.Tennis
{
    public interface ILocationRepository
    {
        List<Location> GetLocations();
        Location GetLocationByName(string locationName);
        int SaveLocation(Location location);
    }
}