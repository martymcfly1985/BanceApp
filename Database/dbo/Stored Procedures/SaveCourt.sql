CREATE PROCEDURE [dbo].[SaveCourt]
	@Name VARCHAR(50),
	@Lights BIT,
	@Surface VARCHAR(50),
	@Condition INT = NULL,
	@LocationRecnum INT
AS
	INSERT INTO Court
	(C_Name,
	C_Lights,
	C_Surface,
	C_Condition,
	C_LRecnum)
	VALUES
	(@Name,
	@Lights,
	@Surface,
	@Condition,
	@LocationRecnum)
RETURN 0

