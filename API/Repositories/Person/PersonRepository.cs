using System.Collections.Generic;
using System.Data.SqlClient;

namespace API.Repositories.Person
{
    public class PersonRepository : IPersonRepository
    {
        public PersonRepository()
        {

        }

        public List<Models.Person.Person> GetPersons()
        {
            List<Models.Person.Person> persons = new List<Models.Person.Person>();
            //this login needs created in sql server management studio
            //i tried but it sql server management studio doesn't let me login with it for some reason.
            //if we can figure that out, we'd be set...i think
            using (SqlConnection connection = new SqlConnection("Data Source=localhost; Initial Catalog=Bance; User ID=VisualStudio; Password=vs123"))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Person", connection);
                command.Connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var person = new Models.Person.Person();
                        person.FirstName = reader["P_FirstName"].ToString();
                        person.LastName = reader["P_LastName"].ToString();
                        persons.Add(person);
                        //Console.WriteLine(String.Format("{0}", reader["id"]));
                    }
                }
            }

            //List<Models.Person.Person> persons = new List<Models.Person.Person>();
            //var person = new Models.Person.Person();
            //person.FirstName = "Ben";
            //person.LastName = "Windland";
            //persons.Add(person);

            return persons;
        }
    }
}
