Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports API.Models.Tennis
Imports API.Services.Tennis
Imports UI.Plumbing

Namespace Controllers
    Public Class LocationController
        Inherits ApiController
        Private ReadOnly Property LocationService As ILocationService
            Get
                Return AppContainer.Container.Resolve(Of ILocationService)
            End Get
        End Property

        <Route("api/getLocationData")>
        <HttpGet()>
        Function GetLocations() As HttpResponseMessage
            Return Request.CreateResponse(HttpStatusCode.OK, LocationService.GetLocationInformation(), Request.GetConfiguration())
        End Function

        <Route("api/submitNewLocation")>
        <HttpPost()>
        Function SaveNewLocation(newLocation As Location) As HttpResponseMessage
            LocationService.SaveLocation(newLocation)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function
    End Class
End Namespace