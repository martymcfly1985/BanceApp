CREATE PROCEDURE [dbo].[GetLeagueByRecnum]
	@leagueRecnum INT 
AS
	SELECT
		*
	FROM
		League
	WHERE
		LG_Recnum = @leagueRecnum
