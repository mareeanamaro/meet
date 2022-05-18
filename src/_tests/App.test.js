import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';

import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

//unit testing
describe ('<App /> Component', () => {
    let AppWrapper;

    beforeAll(() =>
    AppWrapper = shallow(<App />));
    
    test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
    });
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
    test('renders number of events', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });

});

//integration testing
describe('<App /> integration', () => {

    test('App passes "events" state as a prop to EventList', () => {
      const AppWrapper = mount(<App />);
      const AppEventsState = AppWrapper.state('events');
      expect(AppEventsState).not.toEqual(undefined);
      expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
      AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
      });

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations});
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location == selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "see all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('NumberOfEvents input change changes the state in both components', () => {
        const AppWrapper = mount (<App />);
        const NumberOfEventsWrapper=AppWrapper.find(NumberOfEvents);
        NumberOfEventsWrapper.setState({
            numberOfEvents: '32',
          });
        const testNumber = { target: { value: 2 } };
        NumberOfEventsWrapper.find('.number-of-events').simulate('change', testNumber);
        NumberOfEventsWrapper.update();
        expect(NumberOfEventsWrapper.state('number')).toBe(2);
        expect(AppWrapper.state('numberOfEvents')).toBe(2);
        AppWrapper.unmount();
    });

     test('get 32 events when user doesnt select a number)', () => {
        const AppWrapper = mount (<App />);
        expect(AppWrapper.state('numberOfEvents')).toBe(32);
        AppWrapper.unmount();
     });

    test('input change in NumberOfEvents updates the events state in App component', async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const selectedNumber = 1;
        await NumberOfEventsWrapper.instance().handleChange({
          target: { value: selectedNumber },
        });
        AppWrapper.setState({ location: location });
        expect(AppWrapper.state("events")).not.toEqual(undefined);
        expect(AppWrapper.state("events")).toHaveLength(selectedNumber);
        AppWrapper.unmount();
      });
        });

   


