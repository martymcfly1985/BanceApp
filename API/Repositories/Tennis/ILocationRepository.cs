using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Repositories.Tennis
{
    public interface ILocationRepository
    {
        List<Location> GetLocations();
        int SaveLocation(Location location);
    }
}