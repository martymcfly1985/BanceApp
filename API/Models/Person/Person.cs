using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
