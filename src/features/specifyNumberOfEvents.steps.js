import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    let AppWrapper;

    test('When user has not specified a number, 32 is the default number.', ({ given, when, then }) => {
        given('the user has the app open.', () => {
            AppWrapper = mount (<App />)
        });

        when('the user does not type in a number of events they would like to see.', () => {
            AppWrapper.update()
        });

        then('the app should display thirty-two events.', () => {
            expect(AppWrapper.find('.event').hostNodes()).toHaveLength(2)
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        given('the user has selected a city OR the default list has loaded', () => {
            AppWrapper = mount (<App />)
        });

        when('the user types in the Number of Events textbox.', () => {
            AppWrapper.update()
            let NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            let testNumber = { target: { value: 1 } };
            NumberOfEventsWrapper.find('.number-of-events').simulate('change', testNumber);
        });

        then('the number of events shown changes to the number the user typed in the textbox', () => {
            AppWrapper.update()
            expect(AppWrapper.find('.event').hostNodes()).toHaveLength(1)
        });
    });
})