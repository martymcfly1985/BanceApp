@Code
    ViewData("Title") = "About"
End Code

<h2>@ViewData("Title").</h2>
<h3>@ViewData("Message")</h3>
<div>@ViewData("FirstName")</div>
<table>
    <thead>
        Court Surface
    </thead>
    <thead>
        Court Condition
    </thead>
    <thead>
        Lights
    </thead>
    <tr>
        <td>
            @ViewData("CourtSurface")
        </td>
        <td>
            @ViewData("CourtCondition")
        </td>
        <td>
            @ViewData("Lights")
        </td>
    </tr>
</table>

@Using Html.BeginForm("AddPerson", "Home", FormMethod.Post)
@<fieldset>
    <input type="hidden" id="formSubmissionMessage" name="formSubmissionMessage" value="@ViewData("FormSubmissionMessage")"/>
    <label style="text-decoration: underline;" for="firstName">First Name</label>
    <br />
    <input type="text" name="firstName" id="firstName" />
    <br />
    <label style="text-decoration: underline;" for="lastName">Last Name</label>
    <br />
    <input type="text" name="lastName" id="lastName" />
    <br />
    <label style="text-decoration: underline;" for="Middle Initial">Middle Initial</label>
    <br />
    <input type="text" name="middleInitial" id="middleInitial" />
    <br />
    <label style="text-decoration: underline;" for="ssn">Social Security Number</label>
    <br />
    <input type="text" name="ssn" id="ssn" />
    <br />
    <label style="text-decoration: underline;" for="birthDate">Birth Date</label>
    <br />
    <input type="date" name="birthDate" id="birthDate" />
    <br />
    <br />
    <input type="submit" value="Submit" id="submit" />
</fieldset>
End Using

@Section Javascript
    <script type="text/javascript">
        $(document).ready(function () {
            var submissionMessage = $("#formSubmissionMessage").val();
            if (submissionMessage !== "") {
                alert(submissionMessage);
            }
        })
    </script>
End Section
