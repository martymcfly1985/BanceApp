CREATE PROCEDURE [dbo].[CreateSessionRecnum]
	@UserRecnum INT
AS
	IF EXISTS (SELECT TOP 1 * FROM Session WHERE S_UserRecnum = @UserRecnum)
	BEGIN
		UPDATE Session
		SET S_SessionRecnum = NEWID(), S_ExpirationDateTime = GETUTCDATE() + 100
		WHERE S_UserRecnum = @UserRecnum
	END
	ELSE
	BEGIN
		INSERT INTO Session
		(
			S_UserRecnum,
			S_SessionRecnum,
			S_ExpirationDateTime
		)
		VALUES
		(
			@UserRecnum,
			NEWID(),
			GETUTCDATE() + 100
		)
	END
	
SELECT S_SessionRecnum FROM Session WHERE S_UserRecnum = @UserRecnum
