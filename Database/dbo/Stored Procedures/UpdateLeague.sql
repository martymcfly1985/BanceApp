CREATE PROCEDURE [dbo].[UpdateLeague]
	@Recnum INT,
	@Name VARCHAR(50),
	@Public BIT,
	@Joinable BIT,
	@City VARCHAR(50),
	@State VARCHAR(50),
	@Playtime VARCHAR(50)
AS
	UPDATE League
	SET 
		[LG_Name] = @Name,
		[LG_Public] = @Public,
		[LG_Joinable] = @Joinable,
		[LG_City] = @City,
		[LG_State] = @State,
		[LG_Playtime] = @Playtime
	WHERE
		LG_Recnum = @Recnum