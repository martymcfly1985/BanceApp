CREATE TABLE [dbo].[Match]
(
	M_Recnum INT IDENTITY (1,1) NOT NULL,
	M_LGRecnum INT NOT NULL,
	M_CRecnum INT NOT NULL,
	M_DateTime DATETIME NOT NULL,
	M_PlayerOne INT NOT NULL,
	M_PlayerTwo INT NOT NULL,
	M_PlayerThree INT NOT NULL,
	M_PlayerFour INT NOT NULL,
)