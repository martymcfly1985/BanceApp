using API.Models.Tennis;
using API.Repositories.Tennis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
