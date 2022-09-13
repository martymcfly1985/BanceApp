using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models.Tennis
{
    public class Location
    {
        public int Recnum { get; set; }
        public string Hours { get; set; }
        public string Address { get; set; }
        public string Name { get; set; }
        public List<Court> Courts { get; set; }

    }
}
