import React from 'react';

import HomeComponent  from './home.js';


       


describe("<HomeComponent />", () => {
    test('should render correctly', () => {

        const component = shallow(<HomeComponent />)
        expect(component).toMatchSnapshot();
    });
});

