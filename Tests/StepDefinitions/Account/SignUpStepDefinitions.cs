using API.Models.Account;
using FluentAssertions;
using TechTalk.SpecFlow;

namespace Tests.StepDefinitions.Account
{
    [Binding]
    public class SignUpStepDefinitions : IntegrationTest
    {
        User user = new User();
        bool isEmailUnique;
        bool isUsernameUnique;

        [Given(@"the following user input from the sign up page")]
        public void GivenTheFollowingUserInputFromTheSignUpPage(Table table)
        {
            user.Email = table.Rows[0]["Email"];
            user.Username = table.Rows[0]["Username"];
            user.FirstName = table.Rows[0]["First Name"];
            user.LastName = table.Rows[0]["Last Name"];
            user.State = table.Rows[0]["State"];
            user.City = table.Rows[0]["City"];
            user.Password = table.Rows[0]["Password"];
            user.Verified = false;
            user.Public = false;
            user.Leagues = "";
            user.SkillLevel = 0;
            user.Role = 0;
        }

        [When(@"the user selects the submit button")]
        public void WhenTheUserSelectsTheSubmitButton()
        {
            AccountDataManager.UserService.SaveNewUser(user);
        }

        [Then(@"the new user should be created")]
        public void ThenTheNewUserShouldBeCreated()
        {
            var userList = AccountDataManager.GetUsers();
            userList.Count.Should().Be(1);
            userList[0].Email.Should().Be(user.Email);
            userList[0].Username.Should().Be(user.Username);
            userList[0].FirstName.Should().Be(user.FirstName);
            userList[0].LastName.Should().Be(user.LastName);
            userList[0].State.Should().Be(user.State);
            userList[0].City.Should().Be(user.City);
            userList[0].Password.Should().Be(user.Password);
            userList[0].Verified.Should().Be(user.Verified);
            userList[0].Public.Should().Be(user.Public);
            userList[0].Leagues.Should().Be(user.Leagues);
            userList[0].SkillLevel.Should().Be(user.SkillLevel);
            userList[0].Role.Should().Be(user.Role);
        }

        [Given(@"the email testemail@gmail\.com is already in use")]
        public void GivenTheEmailTestemailGmail_ComIsAlreadyInUse()
        {
            user.Email = "testemail@gmail.com";
            user.Username = "TestUser";
            user.FirstName = "Test";
            user.LastName = "User";
            user.State = "OH";
            user.City = "Columbus";
            user.Password = "testpassword";
            user.Verified = false;
            user.Public = false;
            user.Leagues = "";
            user.SkillLevel = 0;
            user.Role = 0;

            AccountDataManager.UserService.SaveNewUser(user);
        }

        [When(@"the user enters testemail@gmail\.com on the signup page")]
        public void WhenTheUserEntersTestemailGmail_ComOnTheSignupPage()
        {
            isEmailUnique = AccountDataManager.UserService.IsEmailUnique(user.Email);
        }

        [Then(@"the user will be notified that the email testemail@gmail\.com is already in use")]
        public void ThenTheUserWillBeNotifiedThatTheEmailTestemailGmail_ComIsAlreadyInUse()
        {
            isEmailUnique.Should().BeFalse();
        }

        [Given(@"the username TestUser is already in use")]
        public void GivenTheUsernameTestUserIsAlreadyInUse()
        {
            user.Email = "testemail@gmail.com";
            user.Username = "TestUser";
            user.FirstName = "Test";
            user.LastName = "User";
            user.State = "OH";
            user.City = "Columbus";
            user.Password = "testpassword";
            user.Verified = false;
            user.Public = false;
            user.Leagues = "";
            user.SkillLevel = 0;
            user.Role = 0;

            AccountDataManager.UserService.SaveNewUser(user);
        }
        
        [When(@"the user enters TestUser on the signup page")]
        public void WhenTheUserEntersTestUserOnTheSignupPage()
        {
            isUsernameUnique = AccountDataManager.UserService.IsUsernameUnique(user.Username);
        }

        [Then(@"the user will be notified that the username TestUser is already in use")]
        public void ThenTheUserWillBeNotifiedThatTheUsernameTestUserIsAlreadyInUse()
        {
            isUsernameUnique.Should().BeFalse();
        }
    }
}
