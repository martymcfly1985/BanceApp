Imports API.Services.Person
Imports API.Services.Campground
Imports UI.Plumbing
Imports API.Services.Tennis

Public Class HomeController
    Inherits System.Web.Mvc.Controller

    Private ReadOnly Property PersonService As IPersonService
        Get
            Return AppContainer.Container.Resolve(Of IPersonService)
        End Get
    End Property
    Private ReadOnly Property CampgroundService As ICampgroundService
        Get
            Return AppContainer.Container.Resolve(Of ICampgroundService)
        End Get
    End Property
    Private ReadOnly Property CourtService As ICourtService
        Get
            Return AppContainer.Container.Resolve(Of ICourtService)
        End Get
    End Property
    Function Index() As ActionResult
        Return View()
    End Function

    Function About() As ActionResult
        ViewData("Message") = "Your application description page."
        ViewData("FirstName") = PersonService.GetFirstNameOfFirstPersonInDatabase()
        Dim court = CourtService.GetCourtInformation()
        If court.Surface <> "" AndAlso court.Condition <> "" AndAlso court.Lights <> False Then
            ViewData("CourtSurface") = court.Surface
            ViewData("CourtCondition") = court.Condition
            ViewData("Lights") = court.Lights
        End If
        Return View()
    End Function

    Function Contact() As ActionResult
        ViewData("Message") = "Your contact page."
        ViewData("Name") = CampgroundService.GetNameOfFirstCampgroundInDatabase()

        Return View()
    End Function
End Class
