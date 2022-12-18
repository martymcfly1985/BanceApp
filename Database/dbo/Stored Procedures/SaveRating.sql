CREATE PROCEDURE [dbo].[SaveRating]
	@Rating INT,
	@CourtRecnum INT
AS
	UPDATE CourtCondition
	SET CC_NumberOfRatings = CC_NumberOfRatings + 1, CC_RatingTotal = CC_RatingTotal + @Rating 
	WHERE CC_CourtRecnum = @CourtRecnum

	DECLARE @RatingTotal AS INT, @NumOfRatings AS INT
	SELECT @RatingTotal = CC_RatingTotal, @NumOfRatings = CC_NumberOfRatings
	FROM CourtCondition
	WHERE CC_CourtRecnum = @CourtRecnum

	UPDATE Court
	SET C_Condition = @RatingTotal / @NumOfRatings
	WHERE C_Recnum = @CourtRecnum
