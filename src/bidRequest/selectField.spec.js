


import React from 'react';
import { shallow } from 'enzyme';

import {StatusSelectField, CategorySelectField, PrioritySelectField } from './selectField';



describe('MatchSnapShot components', () => {

    test('StatusSelectField snapShot', () => {

        const component = shallow(<StatusSelectField />);
        expect(component).toMatchSnapshot();

    });

    test('CategorySelectField snapShot', () => {

        const component = shallow(<CategorySelectField />);
        expect(component).toMatchSnapshot();

    });

    test('PrioritySelectField snapShot', () => {

        const component = shallow(<PrioritySelectField />);
        expect(component).toMatchSnapshot();

    });


});


