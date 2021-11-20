


import React from 'react';
import { shallow, render } from 'enzyme';

import BidRequest from './bidRequest';



describe('<BidRequest />', () => {

    test('snapShot correctly', () => {

        const component = shallow(<BidRequest />);
        expect(component).toMatchSnapshot();

    });
});


