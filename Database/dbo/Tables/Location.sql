CREATE TABLE [dbo].[Location]
(
	[L_Recnum] INT IDENTITY (1,1) NOT NULL, 
    [L_Name] VARCHAR(50) NULL, 
    [L_Address] VARCHAR(50) NULL, 
    [L_Hours] VARCHAR(50) NULL,
    CONSTRAINT [PK_Location]  PRIMARY KEY CLUSTERED ([L_Recnum] ASC)
)
