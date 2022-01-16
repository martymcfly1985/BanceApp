CREATE TABLE [dbo].[Person]
(
	[P_Recnum] INT NOT NULL PRIMARY KEY, 
    [P_FirstName] VARCHAR(50) NULL, 
    [P_LastName] VARCHAR(50) NULL, 
    [P_MiddleInitial] VARCHAR(50) NULL, 
    [P_SSN] NCHAR(10) NULL, 
    [P_Birthdate] DATE NULL
)
