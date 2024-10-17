Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports API.Models.Tennis
Imports API.Services.Tennis.League
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
        <HttpGet()>
        Function GetUserLeagueData(userRecnum As Int32) As HttpResponseMessage
            LeagueService.GetUserLeagueData(userRecnum)
            Return Request.CreateResponse(HttpStatusCode.OK, LeagueService.GetUserLeagueData(userRecnum), Request.GetConfiguration())
        End Function

        <Route("api/updateLeague")>
        <HttpPost()>
        Function UpdateLeague(newLeagueValues As League) As HttpResponseMessage
            LeagueService.UpdateLeague(newLeagueValues)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

    End Class
End Namespace