Feature: SignUp

Scenario: Signing up with valid information
	Given the following user input from the sign up page
	| Email               | Username | First Name | Last Name | Password     | State | City     |
	| testemail@gmail.com | TestUser | Test       | User      | testpassword | OH    | Columbus |
	When the user selects the submit button
	Then the new user should be created 

Scenario: Signing up with an email address that is in use by another user
	Given the email testemail@gmail.com is already in use 
	When the user enters testemail@gmail.com on the signup page
	Then the user will be notified that the email testemail@gmail.com is already in use 

Scenario: Signing up with a username that is in use by another user
	Given the username TestUser is already in use 
	When the user enters TestUser on the signup page
	Then the user will be notified that the username TestUser is already in use 