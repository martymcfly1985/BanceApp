CREATE PROCEDURE [dbo].[SavePerson]
	@FirstName VARCHAR(50),
	@LastName VARCHAR(50),
	@MiddleInitial VARCHAR(1),
	@Ssn VARCHAR(10),
	@BirthDate DateTime = NULL
AS
	INSERT INTO Person
	(P_FirstName,
	P_LastName,
	P_MiddleInitial,
	P_SSN,
	P_Birthdate)
	VALUES
	(@FirstName,
	@LastName,
	@MiddleInitial,
	@Ssn,
	@BirthDate)
RETURN 0
