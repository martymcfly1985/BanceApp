CREATE TABLE [dbo].[CourtRatingAudit]
(
	[CR_Recnum] INT IDENTITY (1,1) NOT NULL, 
    [CR_CourtRecnum] INT NOT NULL, 
    [CR_UserRecnum] INT NOT NULL, 
    [CR_Rating] INT NOT NULL, 
    [CR_RatingDateTime] DATETIME NOT NULL,
    CONSTRAINT [PK_CourtRating]  PRIMARY KEY CLUSTERED ([CR_Recnum] ASC)
)
