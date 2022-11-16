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

        public bool SaveLocation(Location location)
        {
            if(LocationNameIsUnique(location.Name))
            {
                var savedLocationRecnum = locationRepository.SaveLocation(location);

                foreach(Court court in location.Courts)
                {
                    court.LocationRecnum = savedLocationRecnum;
                    courtRepository.SaveCourt(court);
                }
                return true;
            }
            return false;
        }

        public List<Location> GetLocationInformation()
        {
            return locationRepository.GetLocations();
        }

        private bool LocationNameIsUnique(string locationName)
        {
            return locationRepository.GetLocationByName(locationName).Name == null;
        }
    }
}
