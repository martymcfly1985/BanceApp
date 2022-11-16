using API.Models.Tennis;
using API.Repositories.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository locationRepository;
        private readonly ICourtRepository courtRepository;

        public LocationService(ILocationRepository locationRepository, ICourtRepository courtRepository)
        {
            this.locationRepository = locationRepository;
            this.courtRepository = courtRepository;
        }

        public void SaveLocation(Location location)
        {
            var savedLocationRecnum = locationRepository.SaveLocation(location);

            foreach(Court court in location.Courts)
            {
                court.LocationRecnum = savedLocationRecnum;
                courtRepository.SaveCourt(court);
            }
        }

        public List<Location> GetLocationInformation()
        {
            return locationRepository.GetLocations();
        }
    }
}
