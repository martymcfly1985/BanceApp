namespace API.Models.Factory
{
    public interface IGenericFactory
    {
        T Create<T>();
        void Release(object instance);
    }
}
