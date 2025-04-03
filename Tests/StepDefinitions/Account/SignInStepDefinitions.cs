using API.Models.Account;
using FluentAssertions;
using TechTalk.SpecFlow;

namespace Tests.StepDefinitions.Account
{
    [Binding]
    public class SignInStepDefinitions : IntegrationTest
    {
        User signedInUser = null;

        [Given(@"the following sign in credentials")]
        public void GivenTheFollowingSignInCredentials(Table table)
        {
            User user = new User();
            user.Email = "testemail@gmail.com";
            user.Username = table.Rows[0]["Username"];
            user.FirstName = "Test";
            user.LastName = "User";
            user.State = "OH";
            user.City = "Columbus";
            user.Password = table.Rows[0]["Password"];
            user.Verified = false;
            user.Public = false;
            user.Leagues = "";
            user.SkillLevel = 0;
            user.Role = 0;

            AccountDataManager.UserService.SaveNewUser(user);
        }

        [When(@"I submit this '([^']*)' and '([^']*)'")]
        public void WhenISubmitThisAnd(string username, string password)
        {
            SignInInfo signInInfo = new SignInInfo();
            signInInfo.Username = username;
            signInInfo.Password = password;
            //signedInUser = AccountDataManager.UserService.SignIn(signInInfo);
        }

        [Then(@"I should be '([^']*)'")]
        public void ThenIShouldBe(bool signedIn)
        {
            bool userWasSignedIn = signedInUser != null;
            userWasSignedIn.Should().Be(signedIn);
        }
    }
}
