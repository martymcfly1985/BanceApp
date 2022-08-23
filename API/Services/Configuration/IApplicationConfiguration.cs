namespace API.Services.Configuration
{
    public interface IApplicationConfiguration
    {
        string ConnectionString { get; set; }
    }
}