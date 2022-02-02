using API.DataAccess;
using API.DataAccess.Models;
using System.Collections.Generic;
using System.Data;
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
            using (SqlConnection connection = new SqlConnection(Connection.ConnectionString))
            {
                SqlCommand command = new SqlCommand("GetPersons", connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Connection.Open();
                using (EnhancedSqlDataReader reader = new EnhancedSqlDataReader(command.ExecuteReader()))
                {
                    while (reader.Read())
                    {
                        // This is ugly and should be cleaned up but I did various styles of retrieving data to show you the different ways you could do it.
                        var person = new Models.Person.Person();
                        person.FirstName = reader.GetStringValueOrEmptyString("P_FirstName");
                        person.LastName = reader.GetStringValueOrEmptyString("P_LastName");
                        person.MiddleInitial = reader.GetStringValueOrEmptyString("P_MiddleInitial");
                        person.Recnum = reader.GetInt32("P_Recnum");
                        person.Ssn = reader.GetStringValueOrEmptyString("P_SSN");
                        person.BirthDate = reader.GetNullableDateTime("P_Birthdate");
                        persons.Add(person);
                    }
                }
            }

            return persons;
        }
    }
}
