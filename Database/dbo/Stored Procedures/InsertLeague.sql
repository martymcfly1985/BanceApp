CREATE PROCEDURE [dbo].[InsertLeague]
	@Name VARCHAR(50),
	@Public BIT,
	@Joinable BIT,
	@City VARCHAR(50),
	@State VARCHAR(50),
	@Playtime VARCHAR(50)
AS
	INSERT INTO [dbo].[League]
	(
		[LG_Name],
		[LG_Public],
		[LG_Joinable],
		[LG_City],
		[LG_State],
		[LG_Playtime]
	)
	VALUES
	(
		@Name,
		@Public,
		@Joinable,
		@City,
		@State,
		@Playtime
	)

SELECT
	*
FROM
	[dbo].[League] LM
WHERE
	LM.LG_Recnum = CAST(SCOPE_IDENTITY() AS INT)
