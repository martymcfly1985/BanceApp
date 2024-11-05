CREATE PROCEDURE [dbo].[SearchUsers]
	@input VARCHAR(MAX)
AS
	SET @input = '%'+UPPER(REPLACE(@input,' ',''))+'%'

	SELECT TOP 30
		*
	FROM
		dbo.[User] U
	WHERE
		UPPER(U.U_FirstName+U.U_LastName) LIKE @input
		OR
		UPPER(U.U_Email) LIKE @input
		OR
		UPPER(U.U_Username) LIKE @input
