


import React from 'react';
import { shallow, render } from 'enzyme';

import ReadListBidRequest from './readListBidRequest';



describe('<ReadListBidRequest />', () => {

    test('snapShot correctly', () => {

        const component = shallow(<ReadListBidRequest />);
        expect(component).toMatchSnapshot();

    });
});


