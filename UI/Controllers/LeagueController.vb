Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports UI.Plumbing
Imports RouteAttribute = System.Web.Http.RouteAttribute

Namespace Controllers
    Public Class LeagueController
        Inherits ApiController

        Private ReadOnly Property LeagueService As ILeagueService
            Get
                Return AppContainer.Container.Resolve(Of ILeagueService)
            End Get
        End Property

        <Route("api/getUserLeagueData/{userRecnum}")>
        <HttpPost()>
        Function GetUserLeagueData(userRecnum As Int32) As HttpResponseMessage
            LeagueService.GetUserLeagueData(userRecnum)
            Return Request.CreateResponse(HttpStatusCode.OK, LeagueService.GetUserLeagueData(userRecnum), Request.GetConfiguration())
        End Function

    End Class
End Namespace