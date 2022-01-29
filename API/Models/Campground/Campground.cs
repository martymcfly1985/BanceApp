using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
