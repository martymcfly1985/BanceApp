CREATE PROCEDURE [dbo].[SaveLeagueMember]
	@LeagueRecnum INT,
	@UserRecnum INT,
	@Role VARCHAR(25),
	@Sub BIT
AS

IF EXISTS (SELECT * FROM dbo.LeagueMember WHERE LM_URecnum = @UserRecnum and LM_LGRecnum = @LeagueRecnum)
BEGIN
	UPDATE [dbo].[LeagueMember]
	SET 
		[LM_Role] = @Role,
		[LM_Sub] = @Sub
	WHERE
		LM_URecnum = @UserRecnum 
		AND 
		LM_LGRecnum = @LeagueRecnum
END
ELSE
BEGIN
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
END
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
		AND
		LM_LGRecnum = @LeagueRecnum