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
            return persons[0].FirstName;
        }
    }
}
