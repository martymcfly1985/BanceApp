CREATE PROCEDURE [dbo].[GetUserByUsername]
	@Username VARCHAR(50)
AS
SELECT * FROM [dbo].[User] WHERE U_Username = @Username