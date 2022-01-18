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
            using (SqlConnection connection = new SqlConnection("Data Source=localhost; Initial Catalog=Bance; User ID=BanceAppUser; Password=banceappuser123"))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Person", connection);
                command.Connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        // This is ugly and should be cleaned up but I did various styles of retrieving data to show you the different ways you could do it.
                        var person = new Models.Person.Person();
                        person.FirstName = reader.IsDBNull(reader.GetOrdinal("P_FirstName")) ? "" : reader.GetString(reader.GetOrdinal("P_FirstName"));
                        person.LastName = reader.IsDBNull(reader.GetOrdinal("P_LastName")) ? "" : reader["P_LastName"].ToString();
                        person.MiddleInitial = reader.IsDBNull(reader.GetOrdinal("P_MiddleInitial")) ? "" : reader["P_MiddleInitial"].ToString();
                        person.Recnum = (int)reader["P_Recnum"];
                        person.Ssn = reader.IsDBNull(reader.GetOrdinal("P_SSN")) ? "" : reader["P_SSN"].ToString();
                        person.BirthDate = reader.IsDBNull(reader.GetOrdinal("P_Birthdate")) ? (System.DateTime?)null : reader.GetDateTime(reader.GetOrdinal("P_Birthdate"));
                        persons.Add(person);
                    }
                }
            }

            return persons;
        }
    }
}
