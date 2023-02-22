CREATE TABLE [dbo].[User]
(
	[U_Recnum] INT IDENTITY (1,1) NOT NULL, 
    [U_Username] VARCHAR(50) NOT NULL, 
    [U_Password] VARCHAR(MAX) NOT NULL, 
    [U_Email] VARCHAR(50) NOT NULL, 
    [U_FirstName] VARCHAR(50) NOT NULL, 
    [U_LastName] VARCHAR(50) NOT NULL, 
    [U_City] VARCHAR(50) NOT NULL, 
    [U_State] VARCHAR(50) NOT NULL, 
    [U_Role] INT NOT NULL, 
    [U_Leagues] VARCHAR(50) NULL, 
    [U_Verified] BIT NOT NULL, 
    [U_Public] BIT NOT NULL, 
    [U_SkillLevel] DECIMAL(2, 1) NULL,
    CONSTRAINT [PK_User]  PRIMARY KEY CLUSTERED ([U_Recnum] ASC)
)
