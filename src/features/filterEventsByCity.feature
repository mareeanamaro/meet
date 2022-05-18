Feature: Filter events by city

Scenario: When user has not searched for a city, show upcoming events from all cities.
Given the user has not searched for a city
When the user opens the app
Then he should see upcoming events from all cities.

Scenario: User should see a list of suggestions when they search for a city.
Given the main page is open
When the user starts typing in the city box
Then the user should see a list of suggestions matching what they have typed

Scenario: User can select a city from the suggested list.
Given the user was typing in the textbox
And the user can see a list of suggested cities
When the user selects a city from that list
Then their city should be changed to that city
And the events in that city should appear