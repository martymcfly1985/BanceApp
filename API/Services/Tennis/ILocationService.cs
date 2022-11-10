using API.Models.Tennis;

namespace API.Services.Tennis
{
    public interface ILocationService
    {
        void SaveLocation(Location location);
    }
}