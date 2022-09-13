using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using Tests.TestDataManagers;

namespace Tests.Hooks
{
    [Binding()]
    class SetupHook : IntegrationTest
    {
        [BeforeScenario()]
        public void PerformDataSetup()
        {
            var dataManager = new BaseDataManager();
            dataManager.ResetDatabase();
        }
    }
}
