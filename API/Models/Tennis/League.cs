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
}
