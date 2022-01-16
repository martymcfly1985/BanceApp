# BanceApp
An app for Lance and Ben to practice code

# Setup

- Download visual studio community:
https://visualstudio.microsoft.com/free-developer-offers/

- Select ASP.NET and web development under Web & Cloud and .NET desktop development under Desktop & Mobile.
- Click Install
- In the setup where you pick your color scheme and other settings, choose C#
- Choose clone a repository
- Paste in this URL: https://github.com/martymcfly1985/BanceApp.git

- Inside Visual Studio, at the top, select Extensions/Manage Extensions and add CodeMaid
- Close Visual Studio
- Right Click on Visual Studio and Select Properties/Shortcut/Advanced then check Run as Administrator and Apply the changes
- Open Visual Studio
- Inside Visual Studio hit Ctrl + Shift + B. This is a build and should hopefully install all the NuGet Packages I added but you should double-check and install any missing packages.
- At the top of Visual Studio select Tools/NuGet Package Manager/Manage NuGet Packages for Solution... then download the following (make sure Package Source in the top right is set to all):
Antlr (install on UI)
Castle.Core (Both)
Castle.Windsor (Both)
Castle.Facilities.AspNet.SystemWeb (Both)
DnsClient (API)
Microsoft.AspNet.Mvc (UI)
Microsoft.AspNet.Web.Optimization (UI)
Microsoft.AspNet.WebApi (UI)
Micorsoft.Bcl (Both)
Microsoft.Net.Http (Both)
Portable.BouncyCastle (API)
RazorEngine (API)
System.Data.Common (API)
System.Data.SqlClient (API)
Validation (UI)

- In the search bar on your computer type "Turn windows features on or off" and choose that option
- Scroll down to the option labeled "Internet Information Services" and check the box then expand its node
- Expand the “World Wide Web Service” node
- Expand “Application Development Features” node
- Check the check box labeled “ASP.NET 3.5” and "ASP.NET 4.8"
- Click OK
- Back in the windows search bar, type "iis" and open the app labeled "Internet Information Services"
- On the bar labeled connections, on the left, click the dropdown next to your computer name, then site, then right click default web site and choose Add Application
- Alias is BanceApp and physical path is where the UI project is located on your computer, for example, mine is C:\Users\Lance\source\repos\BanceApp\UI
- Click ok
- With BanceApp selected, double-click on Authentication
- Right Click on Anonymous Authentication, choose edit, and choose "Application Pool Identity"
- Click Ok

- In your file explorer, navigate to the UI folder in BanceApp, then right click on Web.config
- Choose properties, then the security tab
- Click Edit
- Click Add
- Add this user: IIS_IUSRS, then click check names, then ok

- Download the Free Developer Version of SQL Server 2019: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
- Choose basic
- (ignore this. This was a note for me) Server=localhost;Database=master;Trusted_Connection=True;
- After the Installation has completed, Choose "Install SSMS" at the bottom
- Use the download link in the window that was opened to download SQL Server Management Studio 2019
- In Visual Studio, under the Database project, double-click the Local.publish.xml file
- Click "Load Values" then change the filepath that was loaded to match the appropriate path on your computer.
- Click Publish
- Open Sql Server Management Studio
- Type localhost as the server name then click Connect
- From the object explorer on the left, expand localhost/databases/Bance/Tables
- There should be a table there called Person (I made that table) indicating the publish worked.
