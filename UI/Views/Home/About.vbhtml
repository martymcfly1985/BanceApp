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

<p>Use this area to provide additional information.</p>
