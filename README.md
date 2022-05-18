
# Meet App

A server-less PWA app built using a TDD approach for Achievement 4 of my CareerFoundry course.

## Technologies Used

- React
- Create-React-App
- AWS Lambda
- Serverless Toolkit
- Axios
- React-Boostrap

## Testing

- Jest
- Jest-Cucumber
- Pupeteer

## Features
## FEATURE 1: FILTER EVENTS BY CITY  
### **Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.

- **Given** the user hasn’t searched for a city

- **When** the user opens the app

- **Then** he should see upcoming events from all cities.

  
### **Scenario 2:** User should see a list of suggestions when they search for a city.

- **Given** the main page is open

- **When** the user starts typing in the city box

- **Then** the user should see a list of suggestions matching what they have typed

  
### **Scenario 3:** User can select a city from the suggested list.

- **Given** the user was typing in the textbox and he can see a list of suggested cities

- **When** the user selects a city from that list

- **Then** their city should be changed to that city and the events in that city should appear

  

## FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS  
### **Scenario 1:** An event element is collapsed by default.

- **Given** the user has selected a city OR the default list has loaded.

- **When** the user can see a list of events.

- **Then** the event elements should show only basic info and a "Show More" button.

  
### **Scenario 2:** User can expand an event to see its details.

- **Given** the user can see a list of events and the event is collapsed.

- **When** the user clicks on "Show More" for a specific event.

- **Then** the view should expand to show the details for the event 

- **And** the "Show More" button should disappear and be replaced by a "Hide Details" button.


### **Scenario 3:** User can collapse an event to hide its details.

- **Given** the event view is expanded to show details.

- **When** the user clicks the "Hide Details" button.

- **Then** the event view should go back to displaying only the basic info + "Show More" button.
  

## FEATURE 3: SPECIFY NUMBER OF EVENTS  
### **Scenario 1:** When user hasn’t specified a number, 32 is the default number.

- **Given** the user has selected a city.

- **When** the user doesn't type in a number of events they would like to see.

- **Then** the app should display 32 events.

  
### **Scenario 2:** User can change the number of events they want to see.

- **Given** the user has selected a city OR the default list has loaded

- **When** the user types in the "Number of Events" textbox.

- **Then** the number of events shown changes to the number the user typed in the textbox
  

## FEATURE 4: USE THE APP WHEN OFFLINE  
### **Scenario 1:** Show cached data when there’s no internet connection.

- **Given** the user has opened the app before.

- **When** the user opens the app without an internet connection.

- **Then** they should be able to same events they could see the last time they opened the app.

  
### **Scenario 2:** Show error when user changes the settings (city, time range).

- **Given** the user is using the app offline.

- **When** the user to change the city or time range for events.

- **Then** an error message should pop up telling the user they are offline and cannot change their settings until they are back online.
  

## FEATURE 5: DATA VISUALIZATION  
### **Scenario 1:** Show a chart with the number of upcoming events in each city.

- **Given** the user has not selected a city.

- **When** the list of events loads.

- **Then** the user should be able to see a graph displaying the number of events in each city.

## Author
MAREEANAMARO

## Version
0.1.0