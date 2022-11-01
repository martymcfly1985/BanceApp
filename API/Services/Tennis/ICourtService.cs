using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Services.Tennis
{
    public interface ICourtService
    {
        List<Location> GetCourtInformation();
        void SaveCourt(Court court);
    }
}