CREATE PROCEDURE [dbo].[SaveRating]
	@Rating INT,
	@Recnum INT
AS
	UPDATE CourtCondition
	SET CC_NumberOfRatings = CC_NumberOfRatings + 1, CC_RatingTotal = CC_RatingTotal + @Rating 
	WHERE CC_CourtRecnum = @Recnum

	DECLARE @RatingTotal AS INT, @NumOfRatings AS INT
	SELECT @RatingTotal = CC_RatingTotal, @NumOfRatings = CC_NumberOfRatings
	FROM CourtCondition
	WHERE CC_CourtRecnum = @Recnum

	UPDATE Court
	SET C_Condition = @RatingTotal / @NumOfRatings
	WHERE C_Recnum = @Recnum
