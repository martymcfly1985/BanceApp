@Code
    ViewData("Title") = "About"
End Code

<h2>@ViewData("Title").</h2>
<h3>@ViewData("Message")</h3>
<div>@ViewData("FirstName")</div>

@Using Html.BeginForm("AddPerson", "Home", FormMethod.Post)
@<fieldset>
    <label for="firstName">First Name</label>
    <input type="text" name="firstName" id="firstName"/>
    <input type="submit" value="Submit" id="submit"/>
</fieldset>
End Using

@Section Javascript
    @*<script type="text/javascript">
        $("#submit").button().click(function () {
            $.ajax({
                type: "POST",
                url: "@Url.Action("AddPerson", "Home/About")",
                data: JSON.stringify({ "person": $("#firstName").val() }),
                contentType: "application/json",
                // dataType: "json",
                async: true
            });
            alert($("#firstName").val());
        });
    </script>*@
End Section
