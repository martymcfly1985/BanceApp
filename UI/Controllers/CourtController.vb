Imports System.Web.Http
Imports System.Web.Http.Results
Imports API.Models.Tennis
Imports API.Services.Tennis
Imports UI.Plumbing
Imports HttpGetAttribute = System.Web.Http.HttpGetAttribute
Imports RouteAttribute = System.Web.Http.RouteAttribute

Namespace Controllers
    Public Class CourtController
        Inherits ApiController

        Private ReadOnly Property CourtService As ICourtService
            Get
                Return AppContainer.Container.Resolve(Of ICourtService)
            End Get
        End Property

        <Route("api/getLocationData")>
        <HttpGet()>
        Function GetLocations() As JsonResult(Of List(Of Location))
            Return Json(CourtService.GetCourtInformation())
        End Function
    End Class
End Namespace