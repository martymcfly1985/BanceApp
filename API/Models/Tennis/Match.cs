using System;
using System.Collections.Generic;

namespace API.Models.Tennis
{
    public class Match
    {
        public int Recnum { get; set; }
        public int LeagueRecnum { get; set; }
        public int CourtRecnum { get; set; }
        public DateTime Datetime { get; set; }
        public List<MatchPlayer> Players { get; set; }
    }

    public class MatchPlayer
    {
        public int UserRecnum { get; set; }
        public int Team { get; set; }
    }
}
