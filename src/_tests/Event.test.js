import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe ('<Event /> component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[1]} />)
    });

    test('event is being rendered', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });
    test('event renders title', () => {
        expect(EventWrapper.find('.title')).toHaveLength(1);
    });
    test('event renders date & time', () => {
        expect(EventWrapper.find('.startDateTime')).toHaveLength(1);
    });
    test('event renders location', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });
    test('event details are collapsed by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
    test('renders details button', () => {
        expect(EventWrapper.find('.show-details')).toHaveLength(1);
    });
    test('renders details when button is clicked', () => {
        EventWrapper.setState({ collapsed: true });
        EventWrapper.find('.show-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });
    test('hides details when hides-details button is clicked', () => {
        EventWrapper.setState({ collapsed: false });
        EventWrapper.find('.hide-details').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
});