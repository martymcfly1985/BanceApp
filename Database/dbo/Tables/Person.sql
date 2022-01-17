CREATE TABLE [dbo].[Person]
(
	[P_Recnum] INT IDENTITY (1,1) NOT NULL, 
    [P_FirstName] VARCHAR(50) NULL, 
    [P_LastName] VARCHAR(50) NULL, 
    [P_MiddleInitial] VARCHAR(50) NULL, 
    [P_SSN] NCHAR(10) NULL, 
    [P_Birthdate] DATE NULL,
    CONSTRAINT [PK_Person]  PRIMARY KEY CLUSTERED ([P_Recnum] ASC)
)
