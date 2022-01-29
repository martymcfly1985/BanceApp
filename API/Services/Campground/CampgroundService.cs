using API.Repositories.Campground;

namespace API.Services.Campground
{
    public class CampgroundService : ICampgroundService
    {
        private readonly ICampgroundRepository campgroundRepository;

        public CampgroundService(ICampgroundRepository campgroundRepository)
        {
            this.campgroundRepository = campgroundRepository;
        }

        public string GetNameOfFirstCampgroundInDatabase()
        {
            var campgrounds = campgroundRepository.GetCampgrounds();
            if (campgrounds.Count == 0)
            {
                return "No campgrounds to display";
            }

            return campgrounds[0].Name;
        }
    }
}
