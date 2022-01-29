CREATE TABLE [dbo].[Campground]
(
	[P_Recnum] INT IDENTITY (1,1) NOT NULL, 
    [P_DateVisited] DATE NULL,
    [P_Name] VARCHAR(50) NULL, 
    [P_Coordinates] NCHAR(10) NULL, 
    CONSTRAINT [PK_Campground]  PRIMARY KEY CLUSTERED ([P_Recnum] ASC)
)
