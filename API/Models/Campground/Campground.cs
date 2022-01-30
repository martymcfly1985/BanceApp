using System;

namespace API.Models.Campground
{
    public class Campground
    {
        public int Recnum { get; set; }
        public DateTime? DateVisited { get; set; }
        public string Name { get; set; }
        public string Coordinates { get; set; }
    }
}
