using API.Models.Tennis;

namespace API.Services.Tennis
{
    public interface ICourtService
    {
        void SaveCourt(Court court);
        int SaveRating(NewRating rating);
    }
}