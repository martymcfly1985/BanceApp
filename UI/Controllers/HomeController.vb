Imports API.Services.Person
Imports API.Services.Campground
Imports UI.Plumbing
Imports System.Web.Services
Imports API.Models.Person
Imports API.Extensions
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
        'Dim court = CourtService.GetCourtInformation()
        'If court.Surface <> "" AndAlso court.Condition <> "" AndAlso court.Lights <> False Then
        '    ViewData("CourtSurface") = court.Surface
        '    ViewData("CourtCondition") = court.Condition
        '    ViewData("Lights") = court.Lights
        'End If
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
        Dim person = New Person()
        person.FirstName = Request.Form("firstName")
        person.LastName = Request.Form("lastName")
        person.MiddleInitial = Request.Form("middleInitial")
        person.Ssn = Request.Form("ssn")
        person.BirthDate = Request.Form("birthDate").ToNullableDateTime()

        Dim formSubmissionMessage = "Person Added Successfully!"
        Try
            PersonService.SavePerson(person)
        Catch ex As Exception
            formSubmissionMessage = ex.Message
        End Try

        SetInitialAboutScreenData()
        ViewData("FormSubmissionMessage") = formSubmissionMessage
        Return View("About")
    End Function

    Private Function SetInitialAboutScreenData()
        ViewData("Message") = "Your application description page."
        ViewData("FirstName") = PersonService.GetFirstNameOfFirstPersonInDatabase()
    End Function
End Class
