CREATE PROCEDURE [dbo].[SaveRating]
	@Rating INT,
	@CourtRecnum INT,
	@UserRecnum INT
AS
	UPDATE CourtCondition
	SET CC_NumberOfRatings = CC_NumberOfRatings + 1, CC_RatingTotal = CC_RatingTotal + @Rating 
	WHERE CC_CourtRecnum = @CourtRecnum

	DECLARE @RatingTotal AS INT, @NumOfRatings AS INT
	SELECT @RatingTotal = CC_RatingTotal, @NumOfRatings = CC_NumberOfRatings
	FROM CourtCondition
	WHERE CC_CourtRecnum = @CourtRecnum

	INSERT INTO CourtRatingAudit
	(CR_CourtRecnum, CR_UserRecnum, CR_Rating, CR_RatingDateTime)
	VALUES  
	(@CourtRecnum, @UserRecnum, @Rating, GETUTCDATE())

	UPDATE Court
	SET C_Condition = ROUND(@RatingTotal * 1.0 / @NumOfRatings, 0) --Multiplying by 1.0 to get result in decimal form so we can round up
	WHERE C_Recnum = @CourtRecnum

	SELECT C_Condition FROM Court WHERE C_Recnum = @CourtRecnum