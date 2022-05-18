import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;

    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('the user has opened the app.', () => {
            AppWrapper = mount(<App />)
        });

        when('the user can see a list of events.', () => {
            
        });

        then('the event elements should show only basic info', () => {
            const eventDetails = AppWrapper.find('.event .extra-details')
            expect(eventDetails).toHaveLength(0)
        });
    });
    
    test('User can expand an event to see its details.', ({ given, when, then }) => {
        given('the user can see a list of events and the event is collapsed.', async () => {
            AppWrapper = mount(<App />)
        });

        when('the user clicks on Show More for a specific event.', () => {
            AppWrapper.update();
            AppWrapper.find('.show-details').at(0).simulate('click')
        });

        then('the view should expand to show the details for the event', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.extra-details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, when, then }) => {
        given('the event view is expanded to show details.', async () => {
            AppWrapper = await mount(<App />)
            AppWrapper.update();
            AppWrapper.find('.show-details').at(0).simulate('click');
            expect(AppWrapper.find('.extra-details')).toHaveLength(1);
        });

        when('the user clicks the Hide Details button.', () => {
            AppWrapper.find('.hide-details').at(0).simulate('click');
        });

        then('the event view should go back to displaying only the basic info', () => {
            expect(AppWrapper.find('.extra-details')).toHaveLength(0);
        });
    });

        });