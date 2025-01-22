CREATE PROCEDURE [dbo].[SearchUsersNotInLeague]
	@input VARCHAR(MAX),
	@leagueRecnum INT
AS
	SET @input = '%'+UPPER(REPLACE(@input,' ',''))+'%'

	SELECT TOP 30
		U.*
	FROM
		dbo.[User] U
		OUTER APPLY
		(
			SELECT
				STRING_AGG(LM.LM_LGRecnum,',') AS leagueRecnums
			FROM
				dbo.LeagueMember LM
			WHERE
				U.U_Recnum = LM.LM_URecnum
		) LM
	WHERE
		(
			UPPER(U.U_FirstName+U.U_LastName) LIKE @input
			OR
			UPPER(U.U_Email) LIKE @input
			OR
			UPPER(U.U_Username) LIKE @input
		)
		AND
		@leagueRecnum NOT IN (SELECT * FROM STRING_SPLIT(LM.leagueRecnums,','))