using API.Models.Tennis;

namespace API.Repositories.Tennis
{
    public interface ILocationRepository
    {
        int SaveLocation(Location location);
    }
}