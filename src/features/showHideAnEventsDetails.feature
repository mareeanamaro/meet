Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default.
Given the user has opened the app.
When the user can see a list of events.
Then the event elements should show only basic info

Scenario: User can expand an event to see its details.
Given the user can see a list of events and the event is collapsed.
When the user clicks on Show More for a specific event.
Then the view should expand to show the details for the event 

Scenario: User can collapse an event to hide its details.
Given the event view is expanded to show details.
When the user clicks the Hide Details button.
Then the event view should go back to displaying only the basic info