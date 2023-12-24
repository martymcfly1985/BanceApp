CREATE PROCEDURE [dbo].[VerifyAccount]
	@Email VARCHAR(50),
	@VerificationCode INT
AS
	DECLARE @Recnum INT = (SELECT U_Recnum FROM [dbo].[User] WHERE U_Email=@Email)
	DECLARE @VerificationCodeFromDb INT = (SELECT UV_VerificationCode FROM [dbo].[UserVerification] WHERE UV_UserRecnum = @Recnum)

	IF @VerificationCode = @VerificationCodeFromDb
	BEGIN
		UPDATE [dbo].[User]
		SET U_Verified = 1
		WHERE U_Recnum = @Recnum

		DELETE FROM [dbo].[UserVerification] WHERE UV_UserRecnum = @Recnum

		SELECT CAST(1 AS bit) AS AccountVerified
	END
	ELSE
	BEGIN
		SELECT CAST(0 AS bit) AS AccountVerified
	END