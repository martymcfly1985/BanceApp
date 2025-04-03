CREATE PROCEDURE [dbo].[GetLeagueMembers]
	@LeagueRecnum INT

AS

SELECT 
	LM.LM_LGRecnum,
	LM.LM_Recnum,
	U.U_Recnum,
	U.U_FirstName,
	U.U_LastName,
	U.U_Email,
	U.U_Role,
	LM.LM_Role,
	LM.LM_Sub
FROM
	dbo.LeagueMember LM
	LEFT JOIN
	dbo.[User] U
	ON LM.LM_URecnum = U.U_Recnum
WHERE
	LM_LGRecnum = @LeagueRecnum