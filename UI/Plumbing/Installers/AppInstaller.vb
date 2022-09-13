Imports API.DataAccess.Models
Imports API.Services.Configuration
Imports Castle.MicroKernel.Registration
Imports Castle.MicroKernel.SubSystems.Configuration
Imports Castle.Windsor

Public Class AppInstaller
    Implements IWindsorInstaller

    Public Sub Install(container As IWindsorContainer, store As IConfigurationStore) Implements IWindsorInstaller.Install
        container.Register(Component _
                           .[For](Of IApplicationConfiguration) _
                           .DependsOn(Dependency.OnValue("connectionString", Connection.ConnectionString)) _
                           .ImplementedBy(Of ApplicationConfiguration) _
                           .LifestylePerWebRequest())
    End Sub
End Class
