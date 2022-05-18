import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from "../mock-data";
import CitySearch from "../CitySearch";
import { extractLocations } from "../api";

const feature = loadFeature('./src/features/filterEventsByCity.feature');
const locations = extractLocations(mockData);

defineFeature(feature, test => {
    test('When user has not searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('the user has not searched for a city', () => {

        });

        let Appwrapper;

        when('the user opens the app', () => {
            Appwrapper = mount(<App />);
        });

        then('he should see upcoming events from all cities.', () => {
            Appwrapper.update();
            expect(Appwrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {

        let CitySearchWrapper;

        given('the main page is open', () => {
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />);
        });

        when('the user starts typing in the city box', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        then('the user should see a list of suggestions matching what they have typed', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list.', ({ given, and, when, then }) => {
        let AppWrapper;

        given('the user was typing in the textbox', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        and('the user can see a list of suggested cities', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when('the user selects a city from that list', () => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('their city should be changed to that city', () => {
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        and('the events in that city should appear', () => {
            expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
        });
    });
});