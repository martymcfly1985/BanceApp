Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports API.Models.Account
Imports API.Services.Account
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

        <Route("api/isEmailUnique")>
        <HttpPost()>
        Function IsEmailUnique(newEmail) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.IsEmailUnique(newEmail), Request.GetConfiguration)
        End Function

        <Route("api/saveNewUser")>
        <HttpPost()>
        Function SaveNewUser(newUser As User) As HttpResponseMessage
            UserService.SaveNewUser(newUser)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

        <Route("api/getUserInformation")>
        <HttpPost>
        Function GetUserInformation(signInInfo As SignInInfo) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.GetUserInformation(signInInfo), Request.GetConfiguration())
        End Function
    End Class
End Namespace