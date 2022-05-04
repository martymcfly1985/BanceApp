namespace API.Models.Tennis
{
    public class Court
    {
        public int Recnum { get; set; }
        public int LocationRecnum { get; set; }
        public string Surface { get; set; }
        public string Condition { get; set; }
        public bool Lights { get; set; }
        public string Name { get; set; }
    }
}
