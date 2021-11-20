


import React from 'react';
import { shallow, render } from 'enzyme';

import InputRepairFrom from './inputRepairForm';



describe('<InputRepairFrom />', () => {

    test('snapShot correctly', () => {

        const component = shallow(<InputRepairFrom />);
        expect(component).toMatchSnapshot();

    });
});


