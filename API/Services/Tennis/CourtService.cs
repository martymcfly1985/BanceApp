using API.Models.Tennis;
using API.Repositories.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis
{
    public class CourtService : ICourtService
    {
        private readonly ICourtRepository courtRepository;
        public CourtService(ICourtRepository courtRepository)
        {
            this.courtRepository = courtRepository;
        }

        public List<Location> GetCourtInformation()
        {
            return courtRepository.GetLocations();
        }
    }
}
