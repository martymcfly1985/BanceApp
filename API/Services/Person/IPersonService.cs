namespace API.Services.Person
{
    public interface IPersonService
    {
        string GetFirstNameOfFirstPersonInDatabase();
        void SavePerson(Models.Person.Person person);
    }
}