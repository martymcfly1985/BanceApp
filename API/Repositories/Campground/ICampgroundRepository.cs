using System.Collections.Generic;

namespace API.Repositories.Campground
{
    public interface ICampgroundRepository
    {
        List<Models.Campground.Campground> GetCampgrounds();
    }
}