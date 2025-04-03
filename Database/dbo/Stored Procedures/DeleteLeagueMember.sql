CREATE PROCEDURE [dbo].[DeleteLeagueMember]
	@userRecnum INT,
	@leagueRecnum INT
AS
	DELETE FROM
		dbo.LeagueMember
	WHERE
		LM_URecnum = @userRecnum
		AND 
		LM_LGRecnum = @leagueRecnum