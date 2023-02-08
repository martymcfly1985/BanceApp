namespace API.Models.Account
{
    public class User
    {
        public int Recnum { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public Role Role { get; set; }
        public string Leagues { get; set; }
        public bool Verified { get; set; }
        public bool Public { get; set; }
        public decimal SkillLevel { get; set; }
        
    }

    public enum Role
    {
        User,
        Moderator,
        Admin
    }
}
