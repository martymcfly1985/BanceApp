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

        public Court GetCourtInformation()
        {
            var courts = courtRepository.GetCourts();
            if(courts.Count == 0)
            {
                return new Court();
            }
            return courts[0];
        }
    }
}
