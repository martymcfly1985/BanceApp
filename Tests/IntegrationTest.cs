using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using Tests.TestDataManagers;

namespace Tests
{
    public class IntegrationTest
    {
        public CourtDataManager CourtDataManager
        {
            get
            {
                if (!ScenarioContext.Current.ContainsKey("CourtDataManager"))
                {
                    ScenarioContext.Current["CourtDataManager"] = new CourtDataManager();
                }

                return (CourtDataManager)ScenarioContext.Current["CourtDataManager"];
            }
        }
    }
}
