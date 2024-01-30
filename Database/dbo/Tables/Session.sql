CREATE TABLE [dbo].[Session]
(
	[S_UserRecnum] INT NOT NULL PRIMARY KEY,
	[S_SessionRecnum] VARCHAR(MAX) NOT NULL,
	[S_ExpirationDateTime] DATETIME NOT NULL
)
