using System.Collections.Generic;

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
            var person = new Models.Person.Person();
            person.FirstName = "Ben";
            person.LastName = "Windland";
            persons.Add(person);

            return persons;
        }
    }
}
