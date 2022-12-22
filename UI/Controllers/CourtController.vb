Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports API.Models.Tennis
Imports API.Services.Tennis
Imports UI.Plumbing
Imports RouteAttribute = System.Web.Http.RouteAttribute

Namespace Controllers
    Public Class CourtController
        Inherits ApiController

        Private ReadOnly Property CourtService As ICourtService
            Get
                Return AppContainer.Container.Resolve(Of ICourtService)
            End Get
        End Property

        <Route("api/submitNewCourt")>
        <HttpPost()>
        Function SaveNewCourt(newCourt As Court) As HttpResponseMessage
            CourtService.SaveCourt(newCourt)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

        <Route("api/submitNewRating")>
        <HttpPost()>
        Function SaveNewRating(newRating As NewRating) As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, CourtService.SaveRating(newRating), Request.GetConfiguration())
        End Function
    End Class
End Namespace