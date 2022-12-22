using API.Models.Tennis;
using FluentAssertions;
using System.Collections.Generic;
using TechTalk.SpecFlow;
using Tests.TestDataManagers;

namespace Tests.StepDefinitions
{
    [Binding]
    public class CourtInformationStepDefinitions : IntegrationTest
    {
        List<Court> expectedCourts;
        List<Location> retrievedCourts;

        [Given(@"the following information is stored in the court table")]
        public void GivenTheFollowingInformationIsStoredInTheCourtTable(Table table)
        {
            expectedCourts = new List<Court>();
            for (int i = 0; i < table.RowCount; i++)
            {
                Court court = new Court()
                {
                    Name = table.Rows[i]["Name"],
                    Surface = table.Rows[i]["Surface"],
                    Condition = int.Parse(table.Rows[i]["Condition"]),
                    Lights = table.Rows[i]["Lights"].ToLower() == "true" ? true : false,
                    LocationRecnum = 1,
                    Recnum = i + 1
                };

                expectedCourts.Add(court);
            }
            CourtDataManager.AddCourtInformation(expectedCourts);
        }

        [When(@"I view the Find a Court Page")]
        public void WhenIViewTheFindACourtPage()
        {
            //retrievedCourts = CourtDataManager.CourtService.GetCourtInformation();
        }

        [Then(@"I should see that information")]
        public void ThenIShouldSeeThatInformation()
        {
            retrievedCourts.Count.Should().Be(expectedCourts.Count);
            for (int i = 0; i < expectedCourts.Count; i++)
            {
               /* expectedCourts[i].Name.Should().Be(retrievedCourts[i].Name);
                expectedCourts[i].Surface.Should().Be(retrievedCourts[i].Surface);
                expectedCourts[i].Condition.Should().Be(retrievedCourts[i].Condition);
                expectedCourts[i].Lights.Should().Be(retrievedCourts[i].Lights);
                expectedCourts[i].LocationRecnum.Should().Be(retrievedCourts[i].LocationRecnum);
                expectedCourts[i].Recnum.Should().Be(retrievedCourts[i].Recnum);*/
            }
        }
    }
}
