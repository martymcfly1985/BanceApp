CREATE PROCEDURE [dbo].[SaveVerificationCode]
	@Email VARCHAR(50),
	@VerificationCode INT
AS
	DECLARE @Recnum INT = (SELECT U_Recnum FROM [dbo].[User] WHERE U_Email = @Email)
	DECLARE @Count INT = 
		(SELECT COUNT(*)
		FROM UserVerification
		WHERE UV_UserRecnum = @Recnum)
	
	IF @Count = 1
	BEGIN 
		UPDATE UserVerification
		SET UV_VerificationCode = @VerificationCode
		WHERE UV_UserRecnum = @Recnum
	END
	ELSE
	BEGIN
		INSERT INTO UserVerification (UV_UserRecnum, UV_VerificationCode)
		VALUES (@Recnum,@VerificationCode)
	END
