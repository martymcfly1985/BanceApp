Feature: Rating

Scenario Outline: Adding a rating to an existing court
	Given a court has the following ratings
	| Rating |
	| 1      |
	| 1      |
	When I give it a new rating of '<Rating>'
	Then the new condition should be '<NewRating>'

	Examples: 
	| Rating | NewRating |
	| 1      | 1         |
	| 2      | 1         |
	| 3      | 2         |
	| 4      | 2         |
