using System.Collections.Generic;

namespace API.Repositories.Person
{
    public interface IPersonRepository
    {
        List<Models.Person.Person> GetPersons();
        void SavePerson(Models.Person.Person person);
    }
}