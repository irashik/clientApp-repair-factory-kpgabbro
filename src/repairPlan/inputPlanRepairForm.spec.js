import React from 'react';
import { shallow, render } from 'enzyme';

import InputPlanRepairForm from './inputPlanRepairForm';



describe('<InputPlanRepairForm />', () => {

    test('snapShot correctly', () => {

        const component = shallow(<InputPlanRepairForm />);
        expect(component).toMatchSnapshot();

    });
});