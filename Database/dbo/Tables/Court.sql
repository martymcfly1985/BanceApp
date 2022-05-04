CREATE TABLE [dbo].[Court]
(
	[C_Recnum] INT IDENTITY (1,1) NOT NULL,
    [C_LRecnum] INT NOT NULL, 
    [C_Lights] BIT NULL, 
    [C_Surface] VARCHAR(50) NULL, 
    [C_Condition] VARCHAR(50) NULL,
    [C_Name] VARCHAR(50) NULL,
    CONSTRAINT [PK_Court]  PRIMARY KEY CLUSTERED ([C_Recnum] ASC)
)
