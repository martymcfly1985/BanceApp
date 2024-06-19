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

        <Route("api/signIn")>
        <HttpPost>
        Function SignIn(signInInfo As SignInInfo) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.SignIn(signInInfo), Request.GetConfiguration())
        End Function

        <Route("api/getUser/{sessionRecnum}")>
        <HttpGet>
        Function GetUser(sessionRecnum As String) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.GetUser(sessionRecnum), Request.GetConfiguration())
        End Function

        <Route("api/sendVerificationEmail")>
        <HttpPost>
        Function SendVerificationEmail(email) As HttpResponseMessage
            UserService.SendVerificationEmail(email)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

        <Route("verify/api/verifyAccount")>
        <HttpPost>
        Function VerifyAccount(verificationInformation As VerificationInformation) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.VerifyAccount(verificationInformation), Request.GetConfiguration())
        End Function

        <Route("api/validatePassword")>
        <HttpPost()>
        Function ValidatePassword(userInformation As SignInInfo) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, UserService.ValidatePassword(userInformation), Request.GetConfiguration)
        End Function

        <Route("api/updateUser")>
        <HttpPost()>
        Function UpdateUser(userInformation As User) As HttpResponseMessage
            UserService.UpdateUser(userInformation)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

    End Class
End Namespace