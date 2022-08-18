Feature: CourtInformation

Scenario: Viewing Court Information
	Given the following information is stored in the court table
	| Name    | Surface  | Lights | Condition |
	| court 1 | concrete | true   | fair      |
	When I view the Find a Court Page
	Then I should see that information
