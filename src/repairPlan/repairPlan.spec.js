


import React from 'react';
import { shallow, render } from 'enzyme';

import RepairPlan from './repairPlan';



describe('ReadPlanListModule', () => {

    test('snapShot correctly', () => {

        const component = shallow(<RepairPlan />);
        expect(component).toMatchSnapshot();

    });
});