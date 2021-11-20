import React from 'react';
import { shallow } from 'enzyme';

import InputBidRequestForm from './inputBidRequestForm';



describe('<InputBidRequestForm />', () => {

    test('snapShot correctly', () => {

        const component = shallow(<InputBidRequestForm />);
        expect(component).toMatchSnapshot();

    });
});


