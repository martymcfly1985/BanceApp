using API.Repositories.Person;

namespace API.Services.Person
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository personRepository;

        public PersonService(IPersonRepository personRepository) 
        {
            this.personRepository = personRepository;
        }

        public string GetFirstNameOfFirstPersonInDatabase()
        {
            var persons = personRepository.GetPersons();
            if (persons.Count == 0)
            {
                return "No name to display";
            }

            return persons[0].FirstName;
        }

        public void SavePerson(Models.Person.Person person)
        {
            personRepository.SavePerson(person);
        }
    }
}
