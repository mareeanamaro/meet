import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />)
    });

    test('renders box with number of events', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });
    test('default number of events is 32', () => {
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
    });
    test('text input updates the state', () => {
        const input = NumberOfEventsWrapper.state('number');
        expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(input);
      });

    });