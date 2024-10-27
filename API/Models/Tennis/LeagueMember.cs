namespace API.Models.Tennis
{
    public class LeagueMember
    {
        public int Recnum { get; set; }
        public int LeagueRecnum { get; set; }
        public int UserRecnum { get; set; }
        public string Role { get; set; }
        public bool Sub { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
