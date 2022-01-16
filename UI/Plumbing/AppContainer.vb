Imports Castle.Windsor
Imports Castle.Windsor.Installer

Namespace Plumbing
    Public Class AppContainer
        Private Sub New()
        End Sub

        Public Shared Container As IWindsorContainer

        Public Shared Sub Setup()
            Container = New WindsorContainer().Install(FromAssembly.This())

            Dim controllerFactory = New ControllerFactory(Container.Kernel)

            ControllerBuilder.Current.SetControllerFactory(controllerFactory)
        End Sub
    End Class
End Namespace

