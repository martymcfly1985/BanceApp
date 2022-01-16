Imports Castle.MicroKernel.Registration
Imports Castle.MicroKernel.SubSystems.Configuration
Imports Castle.Windsor

Namespace Plumbing.Installers
    Public Class ControllerInstaller
        Implements IWindsorInstaller

        Public Sub Install(container As IWindsorContainer, store As IConfigurationStore) Implements IWindsorInstaller.Install
            container.Register(Types.FromThisAssembly() _
                               .Pick().[If](Function(t) t.Name.EndsWith("Controller")) _
                               .Configure(Function(con) con.Named(con.Implementation.Name)) _
                               .LifestylePerWebRequest())
        End Sub
    End Class
End Namespace
