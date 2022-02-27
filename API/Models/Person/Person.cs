using System;

namespace API.Models.Person
{
    public class Person
    {
        public int Recnum { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleInitial { get; set; }
        public string Ssn { get; set; }
        public DateTime? BirthDate { get; set; }
    }
}
