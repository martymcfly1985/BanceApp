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

        public void SavePerson(Models.Person.Person person)
        {
            using (SqlConnection connection = new SqlConnection(Connection.ConnectionString))
            {
                using (SqlCommand command = new SqlCommand("SavePerson", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add("@FirstName", SqlDbType.VarChar).Value = person.FirstName;
                    command.Parameters.Add("@LastName", SqlDbType.VarChar).Value = person.LastName;
                    command.Parameters.Add("@MiddleInitial", SqlDbType.VarChar).Value = person.MiddleInitial;
                    command.Parameters.Add("@Ssn", SqlDbType.VarChar).Value = person.Ssn;
                    command.Parameters.Add("@BirthDate", SqlDbType.DateTime).Value = person.BirthDate;
                    command.Connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
