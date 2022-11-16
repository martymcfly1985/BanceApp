CREATE PROCEDURE [dbo].[SaveLocation]
	@Name VARCHAR(50),
	@Address VARCHAR(50),
	@Hours VARCHAR(50)
AS
	INSERT INTO Location
	(L_Name,
	L_Address,
	L_Hours)
	VALUES
	(@Name,
	@Address,
	@Hours)
SELECT CAST(SCOPE_IDENTITY() AS int) AS recnum