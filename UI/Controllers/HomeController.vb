Imports API.Services.Person
Imports API.Services.Campground
Imports UI.Plumbing
Imports System.Web.Services

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
    Function Index() As ActionResult
        Return View()
    End Function

    Function About() As ActionResult
        SetInitialAboutScreenData()

        Return View()
    End Function

    Function Contact() As ActionResult
        ViewData("Message") = "Your contact page."
        ViewData("Name") = CampgroundService.GetNameOfFirstCampgroundInDatabase()

        Return View()
    End Function

    <HttpPost()>
    Function AddPerson()
        Dim test = Request.Form("firstName")

        SetInitialAboutScreenData()
        Return View("About")
    End Function

    Private Function SetInitialAboutScreenData()
        ViewData("Message") = "Your application description page."
        ViewData("FirstName") = PersonService.GetFirstNameOfFirstPersonInDatabase()
    End Function
End Class
