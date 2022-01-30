CREATE TABLE [dbo].[Campground]
(
	[CG_Recnum] INT IDENTITY (1,1) NOT NULL, 
    [CG_DateVisited] DATE NULL,
    [CG_Name] VARCHAR(50) NOT NULL, 
    [CG_Coordinates] VARCHAR(50) NULL, 
    CONSTRAINT [CGK_Campground]  PRIMARY KEY CLUSTERED ([CG_Recnum] ASC)
)
