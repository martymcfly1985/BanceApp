# BanceApp
An app for Lance and Ben to practice code

# Development Workflow
- Create and/or assign yourself to a JIRA and put it in progress. 
- Create a new branch named after the JIRA, all lowercase. For example, ban-1
- Once work is complete on the branch, make a pull request and assign the other engineers for review. 
- Once you have at least one approval (but preferably all approvals) merge the pull request and delete the branch. 

# Clean Coding Practices
- The UI should be as dumb as possible. We should put as much logic as we can in the API code. This makes it easier to swap out the UI framework, in the future, if we wanted to. It also makes the code more testable, if we ever add integration tests. 
- The controller code should have as little logic as possible. This code is just a middle-man between the UI code and the backend code so 90% of the time, the function in the controller will be able to be boiled down to simply calling the service code. 
- The service classes in the API are where the meat of the logic is written. This is the middle-man between the controller and the repository. The controller should never call the repository directly. This code will perform any logic we need, including structuring the data in a way that the repository needs it and taking data from the repo and structuring it in a way the controller needs it. 
- The repository classes are what talk to the database. It'll call the stored procedures and pass any required parameters. It'll also pass the results (if there are any) back to the service. 
- Any SQL scripts/statements should be put into stored procedures. If we run into a case where this isn't feasible, the code building the script belongs in the repo. 
- Functions and variables should be named as descriptively as possible. The idea is that the code will be descriptive and readable enough that we don't need comments describing what's going on because the code will describe itself. 
- Functions should be small and if you feel like they're getting big, see if you can pull any of the code out into another function. 
- Functions should only do one thing, if at all possible, and shouldn't do more than the name of the function suggests. 
- Private variables should be lowerCamelCase
- Public variables and functions should be CamelCase

# Setup
## Setup Visual Studio

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

## Setup IIS
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

## Setup SQL Server
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
- Right click on localhost and go to properties/security
- Under Server authentication choose SQL Server and Windows Authentication Mode
- Click Ok and then Ok again, acknowledging the server needs restarted.
- Right click on localhost and choose restart
- Close all instances of SQL Server Management Studio and then reopen it.
- Sign back into localhost and under the object explorer go to localhost/security/logins
- Right click on logins and click New Login
- Choose Sql Server Authentication and make the login name BanceAppUser and the password banceappuser123
- Uncheck the "Enforce Password Expiration" box
- Click Server Roles
- Check public and sysadmin
- Click User Mapping
- Check Bance, at the top, and db owner and public, at the bottom
- Click Ok
- If you want to add records to the Person table, you can do that now, but it isn't required.

## Starting the App
- In your web browser go to localhost/BanceApp and cross your fingers that a website talking about ASP.NET loads. If so, you did everything right. If you click About at the top, that's where I've been making my changes. 
