namespace API.Services.Person
{
    public class PersonService : IPersonService
    {
        public PersonService() { }

        public string GetFirstNameOfFirstPersonInDatabase()
        {
            return "Lance";
        }
    }
}
