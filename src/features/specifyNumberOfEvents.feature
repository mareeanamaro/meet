Feature: Specify Number of Events

Scenario: When user has not specified a number, 32 is the default number.
 Given the user has the app open.
 When the user does not type in a number of events they would like to see.
 Then the app should display thirty-two events.

  
 Scenario: User can change the number of events they want to see.
 Given the user has selected a city OR the default list has loaded
 When the user types in the Number of Events textbox.
 Then the number of events shown changes to the number the user typed in the textbox