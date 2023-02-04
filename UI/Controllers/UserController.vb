Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports API.Services.User
Imports UI.Plumbing

Namespace Controllers
    Public Class UserController
        Inherits ApiController
        Private ReadOnly Property UserService As IUserService
            Get
                Return AppContainer.Container.Resolve(Of IUserService)
            End Get
        End Property

        <Route("api/isUsernameUnique")>
        <HttpPost()>
        Function IsUsernameUnique(newUsername) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.IsUsernameUnique(newUsername), Request.GetConfiguration)
        End Function

    End Class
End Namespace