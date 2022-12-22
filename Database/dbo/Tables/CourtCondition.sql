CREATE TABLE [dbo].[CourtCondition]
(
	[CC_CourtRecnum] INT NOT NULL PRIMARY KEY, 
    [CC_RatingTotal] INT NOT NULL DEFAULT 0 , 
    [CC_NumberOfRatings] INT NOT NULL DEFAULT 0 
)
