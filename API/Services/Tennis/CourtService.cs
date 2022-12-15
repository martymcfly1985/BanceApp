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
            var newCourtRecnum = courtRepository.SaveCourt(court);
            AddCourtToCourtConditionTable(newCourtRecnum, court.Condition);
        }

        public void SaveRating(int rating)
        {
            courtRepository.SaveRating(rating);
        }

        private void AddCourtToCourtConditionTable(int courtRecnum, int? courtCondition)
        {
            var numberOfRatings = 0;
            var ratingTotal = 0;
            if(courtCondition != null)
            {
                numberOfRatings = 1;
                ratingTotal = (int)courtCondition;
            }
            courtRepository.AddCourtToCourtConditionTable(courtRecnum, ratingTotal, numberOfRatings);
        }
    }
}
