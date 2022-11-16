using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis
{
    public interface ILocationService
    {
        List<Location> GetLocationInformation();
        void SaveLocation(Location location);
    }
}