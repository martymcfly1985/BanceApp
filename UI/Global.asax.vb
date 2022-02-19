Imports System.Web.Http
Imports System.Web.Optimization
Imports UI.Plumbing

Public Class MvcApplication
    Inherits System.Web.HttpApplication

    Sub Application_Start()
        AreaRegistration.RegisterAllAreas()
        GlobalConfiguration.Configure(AddressOf RegisterWebApi)
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters)
        RouteConfig.RegisterRoutes(RouteTable.Routes)
        BundleConfig.RegisterBundles(BundleTable.Bundles)
        AppContainer.Setup()
    End Sub

    Shared Sub RegisterWebApi(ByVal config As HttpConfiguration)
        config.MapHttpAttributeRoutes()
    End Sub
End Class
