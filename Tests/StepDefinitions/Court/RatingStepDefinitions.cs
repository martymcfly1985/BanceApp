using API.Models.Tennis;
using FluentAssertions;
using System;
using TechTalk.SpecFlow;

namespace Tests.StepDefinitions
{
    [Binding]
    public class RatingStepDefinitions : IntegrationTest
    {
        int newCondition;
        [Given(@"a court has the following ratings")]
        public void GivenACourtHasTheFollowingRatings(Table table)
        {
            Court court = new Court()
            {
                Name = "Whatever",
                Surface = "Clay",
                Condition = null,
                Lights = false,
                LocationRecnum = 1000
            };
            CourtDataManager.CourtService.SaveCourt(court);
            for (int i = 0; i < table.RowCount; i++)
            {
                NewRating newRating = new NewRating()
                {
                    Rating = int.Parse(table.Rows[i]["Rating"]),
                    CourtRecnum = 1
                };
                CourtDataManager.CourtService.SaveRating(newRating);
            }    
        }

        [When(@"I give it a new rating of '([^']*)'")]
        public void WhenIGiveItANewRatingOf(int rating)
        {
            NewRating newRating = new NewRating()
            {
                Rating = rating,
                CourtRecnum = 1
            };
            newCondition = CourtDataManager.CourtService.SaveRating(newRating);
        }

        [Then(@"the new condition should be '([^']*)'")]
        public void ThenTheNewConditionShouldBe(int expectedCondition)
        {
            newCondition.Should().Be(expectedCondition);
        }
    }
}
