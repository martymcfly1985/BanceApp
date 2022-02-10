using API.Models.Tennis;
using API.Repositories.Tennis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
