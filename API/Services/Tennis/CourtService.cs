using API.Models.Tennis;
using API.Repositories.Tennis;
using API.Services.Account;
using System;

namespace API.Services.Tennis
{
    public class CourtService : ICourtService
    {
        private readonly ICourtRepository courtRepository;
        private readonly IUserService userService;
        public CourtService(ICourtRepository courtRepository, IUserService userService)
        {
            this.courtRepository = courtRepository;
            this.userService = userService;
        }
        
        public void SaveCourt(Court court)
        {
            var newCourtRecnum = courtRepository.SaveCourt(court);
            AddCourtToCourtConditionTable(newCourtRecnum, court.Condition);
        }

        public int SaveRating(NewRating rating)
        {
            var userInfo = userService.GetUser(rating.SessionRecnum);
            if(userInfo != null)
            {
                return courtRepository.SaveRating(rating, userInfo.Recnum);
            }
            throw new ArgumentException("Invalid User.");
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
