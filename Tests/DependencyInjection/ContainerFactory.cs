using API.Models.Factory;
using Castle.Facilities.TypedFactory;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.Resolvers.SpecializedResolvers;

namespace Tests.DependencyInjection
{
    public class ContainerFactory : BaseContainerFactory
    {
        public void RegisterComponents()
        {
            Reset();

            Container.AddFacility<TypedFactoryFacility>();
            Container.Register(Component.For<IGenericFactory>().AsFactory());

            Container.Kernel.Resolver.AddSubResolver(new CollectionResolver(Container.Kernel));

            Container.Register(Classes
                .FromAssemblyNamed("Tests")
                .Where(type => type.Name.ToLower().Contains("repository") && type.Name.ToLower().Contains("mock"))
                .WithServiceDefaultInterfaces()
            );

            Container.Register(Classes
                .FromAssemblyNamed("Tests")
                .Where(type => type.Name.ToLower().Contains("service") && type.Name.ToLower().Contains("mock"))
                .WithServiceDefaultInterfaces()
            );

            Container.Register(Classes
                .FromAssemblyNamed("API")
                .Where(type => type.Name.ToLower().Contains("repository"))
                .WithServiceDefaultInterfaces()
            );

            Container.Register(Classes
                .FromAssemblyNamed("API")
                .Where(type => type.Name.ToLower().Contains("service"))
                .WithServiceDefaultInterfaces()
            );
        }
    }
}
