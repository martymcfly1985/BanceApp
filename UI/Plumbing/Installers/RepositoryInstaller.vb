Imports Castle.MicroKernel.Registration
Imports Castle.MicroKernel.SubSystems.Configuration
Imports Castle.Windsor

Namespace Plumbing.Installers
    Public Class RepositoryInstaller
        Implements IWindsorInstaller

        Public Sub Install(container As IWindsorContainer, store As IConfigurationStore) Implements IWindsorInstaller.Install
            container.Register(Classes _
                               .FromAssemblyNamed("API") _
                               .Where(Function(type) type.Name.ToLower().Contains("repository")) _
                               .WithServiceDefaultInterfaces() _
                               .LifestylePerWebRequest())
        End Sub
    End Class
End Namespace