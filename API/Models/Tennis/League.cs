using System.Collections.Generic;
using System.Web.UI.WebControls;

namespace API.Models.Tennis
{
    public class League
    {
        public int Recnum { get; set; }
        public string Name { get; set; }
        public bool Public { get; set; }
        public bool Joinable { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Playtime { get; set; }
    }

    public class MasterLeagueIndex : League
    {
        public List<LeagueMember> Members { get; set; }
        public List<Location> Locations { get; set; }
    }
}
