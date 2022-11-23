CREATE PROCEDURE [dbo].[GetLocationByName]
	@Name VARCHAR(50)
AS
	SELECT * FROM Court LEFT JOIN Location ON C_LRecnum=L_Recnum WHERE L_Name = @Name ORDER BY L_Recnum asc, C_Name asc;