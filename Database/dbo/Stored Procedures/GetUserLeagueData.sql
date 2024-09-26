CREATE PROCEDURE [dbo].[GetUserLeagueData]
	@Recnum INT
AS
	SELECT
		*
	FROM 
		dbo.League L
		LEFT JOIN
		dbo.LeagueMember LM
		on L.LG_Recnum = LM.LM_LGRecnum
	WHERE
		LM.LM_URecnum = @Recnum
