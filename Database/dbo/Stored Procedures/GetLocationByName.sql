CREATE PROCEDURE [dbo].[GetLocationByName]
	@Name VARCHAR(50)
AS
	SELECT 
		* 
	FROM 
		Court 
		LEFT JOIN 
		Location 
		ON C_LRecnum=L_Recnum
		LEFT JOIN
		Match 
		ON C_Recnum = M_CRecnum and M_DateTime >= GETUTCDATE()
		LEFT JOIN
		MatchTeam
		ON M_Recnum = MT_MRecnum
	WHERE L_Name = @Name 
	ORDER BY L_Recnum asc, C_Name asc;