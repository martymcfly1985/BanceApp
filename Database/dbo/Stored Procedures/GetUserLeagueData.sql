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
		LEFT JOIN
		dbo.[User] U
		on LM.LM_URecnum = U.U_Recnum
	WHERE
		LM.LM_URecnum = @Recnum
