import React from 'react';

import FooterComponent  from './footer';



       jest.mock('react-router-bootstrap');
       jest.mock('react-bootstrap/Button');
       jest.mock('react-bootstrap/ButtonGroup');
      // jest.mock('react-bootstrap/Nav');
      // jest.mock('react-bootstrap/Navbar');



describe("<FooterComponent />", () => {
    test('should render correctly', () => {

        const component = shallow(<FooterComponent />)
        expect(component).toMatchSnapshot();
    });
});

