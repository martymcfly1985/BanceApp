CREATE PROCEDURE [dbo].[GetUserLeagueData]
	@Recnum INT
AS
	SELECT * FROM dbo.League WHERE LG_Recnum = @Recnum

