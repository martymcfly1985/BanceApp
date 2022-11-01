CREATE PROCEDURE [dbo].[GetCourts]

AS
	SELECT * FROM Court LEFT JOIN Location ON C_LRecnum=L_Recnum ORDER BY L_Recnum asc, C_Name asc;
