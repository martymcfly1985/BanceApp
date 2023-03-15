Feature: SignIn

Scenario Outline: Trying to sign in with valid/invalid credentials
	Given the following sign in credentials
	| Username | Password     |
	| TestUser | testPassword |
	When I submit this '<Username>' and '<Password>'
	Then I should be '<Logged In>'

	Examples:
	| Username  | Password     | Logged In |
	| JoeSchmo  | testPassword | false     |
	| TestUser  | testPassword | true      |
	| TestUser  | passwordTest | false     |
	| WrongUser | passwprd     | false     |
	| testuser  | testPassword | true      |
	| TestUser  | TeStPAsswoRd | false     |

