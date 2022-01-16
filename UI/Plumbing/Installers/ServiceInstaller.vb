Imports API.Models.Factory
Imports Castle.Facilities.TypedFactory
Imports Castle.MicroKernel.Registration
Imports Castle.MicroKernel.Resolvers.SpecializedResolvers
Imports Castle.MicroKernel.SubSystems.Configuration
Imports Castle.Windsor

Namespace Plumbing.Installers
    Public Class ServiceInstaller
        Implements IWindsorInstaller

        Public Sub Install(container As IWindsorContainer, store As IConfigurationStore) Implements IWindsorInstaller.Install

            container.AddFacility(Of TypedFactoryFacility)()
            container.Register(Component.[For](Of IGenericFactory).AsFactory())

            Container.Kernel.Resolver.AddSubResolver(New CollectionResolver(Container.Kernel))

            container.Register(Classes _
                               .FromAssemblyNamed("API") _
                               .Where(Function(type) type.Name.ToLower().Contains("service")) _
                               .WithServiceDefaultInterfaces() _
                               .LifestylePerWebRequest())
        End Sub
    End Class
End Namespace
