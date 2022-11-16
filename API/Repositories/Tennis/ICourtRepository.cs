using API.Models.Tennis;
using System.Collections.Generic;

namespace API.Repositories.Tennis
{
    public interface ICourtRepository
    {
        void SaveCourt(Court court);
    }
}