Imports API.Services.Person
Imports UI.Plumbing

Public Class HomeController
    Inherits System.Web.Mvc.Controller

    Private ReadOnly Property PersonService As IPersonService
        Get
            Return AppContainer.Container.Resolve(Of IPersonService)
        End Get
    End Property


    Function Index() As ActionResult
        Return View()
    End Function

    Function About() As ActionResult
        ViewData("Message") = "Your application description page."
        ViewData("FirstName") = PersonService.GetFirstNameOfFirstPersonInDatabase()

        Return View()
    End Function

    Function Contact() As ActionResult
        ViewData("Message") = "Your contact page."

        Return View()
    End Function
End Class
