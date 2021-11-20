


import React from 'react';
import { shallow, render } from 'enzyme';

import ReadPlansListModule from './readPlansListModule';



describe('ReadPlanListModule', () => {

    test('snapShot correctly', () => {

        const component = shallow(<ReadPlansListModule />);
        expect(component).toMatchSnapshot();

    });
});