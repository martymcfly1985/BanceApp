using API.Models.Tennis;
using API.Repositories.Tennis;

namespace API.Services.Tennis
{
    public class CourtService : ICourtService
    {
        private readonly ICourtRepository courtRepository;
        public CourtService(ICourtRepository courtRepository)
        {
            this.courtRepository = courtRepository;
        }

        public void SaveCourt(Court court)
        {
            courtRepository.SaveCourt(court);
        }
    }
}
