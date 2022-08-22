Feature: CourtInformation

Scenario: Viewing Court Information
	Given the following information is stored in the court table
	| Name    | Surface  | Lights | Condition |
	| Court 1 | Concrete | true   | Fair      |
	| Court 2 | Grass    | false  | Poor      |
	When I view the Find a Court Page
	Then I should see that information
