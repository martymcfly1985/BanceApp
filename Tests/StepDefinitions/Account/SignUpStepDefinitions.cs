using API.Models.Account;
using FluentAssertions;
using System;
using System.Collections.Generic;
using TechTalk.SpecFlow;

namespace Tests.StepDefinitions
{
    [Binding]
    public class SignUpStepDefinitions : IntegrationTest
    {
        User user = new User();
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
            throw new PendingStepException();
        }

        [Given(@"the user enters testemail@gmail\.com on the signup page")]
        public void GivenTheUserEntersTestemailGmail_ComOnTheSignupPage()
        {
            throw new PendingStepException();
        }

        [Then(@"the user will be notified that the email testemail@gmail\.com is already in use")]
        public void ThenTheUserWillBeNotifiedThatTheEmailTestemailGmail_ComIsAlreadyInUse()
        {
            throw new PendingStepException();
        }

        [Then(@"the user will not be created")]
        public void ThenTheUserWillNotBeCreated()
        {
            throw new PendingStepException();
        }

        [Given(@"the username TestUser is already in use")]
        public void GivenTheUsernameTestUserIsAlreadyInUse()
        {
            throw new PendingStepException();
        }

        [Given(@"the user enters TestUser on the signup page")]
        public void GivenTheUserEntersTestUserOnTheSignupPage()
        {
            throw new PendingStepException();
        }

        [Then(@"the user will be notified that the username TestUser is already in use")]
        public void ThenTheUserWillBeNotifiedThatTheUsernameTestUserIsAlreadyInUse()
        {
            throw new PendingStepException();
        }
    }
}
