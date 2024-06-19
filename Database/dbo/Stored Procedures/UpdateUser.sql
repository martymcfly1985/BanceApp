CREATE PROCEDURE [dbo].[UpdateUser]
	@Recnum INT,
	@Username VARCHAR(50),
	@Email VARCHAR(50),
	@Password VARCHAR(100) = NULL,
	@FirstName VARCHAR(50),
	@LastName VARCHAR(50),
	@Public BIT,
	@City VARCHAR(50),
	@State VARCHAR(50),
	@SkillLevel DECIMAL(2,1) = NULL
AS
	IF(@Password IS NULL)
		BEGIN
			UPDATE [dbo].[User] 
			SET
				U_Username = @Username,
				U_Email = @Email,
				U_FirstName = @FirstName,
				U_LastName = @LastName,
				U_City = @City,
				U_State = @State,
				U_Public = @Public,
				U_SkillLevel = @SkillLevel
			WHERE
				@Recnum = [dbo].[User].U_Recnum
		END
	ELSE
		BEGIN
			UPDATE [dbo].[User] 
			SET
				U_Username = @Username,
				U_Email = @Email,
				U_Password = @Password,
				U_FirstName = @FirstName,
				U_LastName = @LastName,
				U_City = @City,
				U_State = @State,
				U_Public = @Public,
				U_SkillLevel = @SkillLevel
			WHERE
				@Recnum = [dbo].[User].U_Recnum
		END