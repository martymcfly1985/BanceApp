using API.Models.Tennis;
using FluentAssertions;
using System.Collections.Generic;
using TechTalk.SpecFlow;
using Tests.TestDataManagers;

namespace Tests.StepDefinitions
{
    [Binding]
    public class CourtInformationStepDefinitions
    {
        CourtDataManager courtDataManager = new CourtDataManager();
        List<Court> courts;

        [Given(@"the following information is stored in the court table")]
        public void GivenTheFollowingInformationIsStoredInTheCourtTable(Table table)
        {
            courts = new List<Court>();
            for (int i = 0; i < table.RowCount; i++)
            {
                Court court = new Court()
                {
                    Name = table.Rows[i]["Name"],
                    Surface = table.Rows[i]["Surface"],
                    Condition = table.Rows[i]["Condition"],
                    Lights = table.Rows[i]["Lights"].ToLower() == "true" ? true : false,
                    LocationRecnum = 1
                };

                courts.Add(court);
            }
            courtDataManager.AddCourtInformation(courts);
        }

        [When(@"I view the Find a Court Page")]
        public void WhenIViewTheFindACourtPage()
        {
            // nothing to do here
        }

        [Then(@"I should see that information")]
        public void ThenIShouldSeeThatInformation()
        {
            
        }
    }
}
