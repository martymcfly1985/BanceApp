CREATE PROCEDURE [dbo].[AddCourtToCourtCondition]
	@CourtRecnum INT,
	@RatingTotal INT,
	@NumberOfRatings INT
AS
	INSERT INTO CourtCondition
	(CC_CourtRecnum,
	CC_RatingTotal,
	CC_NumberOfRatings)
	VALUES
	(@CourtRecnum,
	@RatingTotal,
	@NumberOfRatings)
RETURN 0
