using API.Models.Tennis;

namespace API.Services.Tennis
{
    public interface ICourtService
    {
        void SaveCourt(Court court);
        void SaveRating(int rating);
    }
}