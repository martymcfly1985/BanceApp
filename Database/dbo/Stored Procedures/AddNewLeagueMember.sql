CREATE PROCEDURE [dbo].[AddNewLeagueMember]
	@LeagueRecnum INT,
	@UserRecnum INT,
	@Role VARCHAR(25),
	@Sub BIT
AS

INSERT INTO 
	[dbo].[LeagueMember]
	(
		[LM_LGRecnum],
		[LM_URecnum],
		[LM_Role],
		[LM_Sub]
	)
VALUES
	(
		@LeagueRecnum,
		@UserRecnum,
		@Role,
		@Sub
	)
	
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
	LM_URecnum = @UserRecnum
	and
	LM_LGRecnum = @LeagueRecnum