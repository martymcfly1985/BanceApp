CREATE PROCEDURE [dbo].[GetUserByEmail]
	@Email VARCHAR(50)
AS
SELECT * FROM [dbo].[User] WHERE U_Email = @Email