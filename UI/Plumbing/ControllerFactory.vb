Imports Castle.MicroKernel

Namespace Plumbing
    Public Class ControllerFactory
        Inherits DefaultControllerFactory

        Private ReadOnly kernel As IKernel

        Public Sub New(kernel As IKernel)
            Me.kernel = kernel
        End Sub

        Protected Overrides Function GetControllerInstance(requestContext As RequestContext, controllerType As Type) As IController
            If controllerType Is Nothing OrElse (controllerType.Name = "UIComponentsController" Or controllerType.Name = "AuthenticationController") Then
                Return MyBase.GetControllerInstance(requestContext, controllerType)
            End If

            Dim controller = TryCast(kernel.Resolve(controllerType), Controller)

            Return controller
        End Function

        Public Overrides Sub ReleaseController(controller As IController)
            kernel.ReleaseComponent(controller)
        End Sub
    End Class
End Namespace

