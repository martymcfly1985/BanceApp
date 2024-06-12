CREATE PROCEDURE [dbo].[GetUserBySessionRecnum]
	@sessionRecnum VARCHAR(MAX)
AS
	SELECT
	u.*
FROM 
	Session s
	LEFT JOIN
	[User] u
	ON s.S_UserRecnum = u.U_Recnum
WHERE
	@sessionRecnum = s.S_SessionRecnum
	AND
	s.S_ExpirationDateTime > GETUTCDATE()
