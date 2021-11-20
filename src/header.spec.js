import React from 'react';

import HeaderComponent  from './header';



       jest.mock('react-router-bootstrap');
       jest.mock('react-bootstrap/Button');
       jest.mock('react-bootstrap/ButtonGroup');
      // jest.mock('react-bootstrap/Nav');
      // jest.mock('react-bootstrap/Navbar');



describe("<HeaderComponent />", () => {
    test('should render correctly', () => {

        const component = shallow(<HeaderComponent />)
        expect(component).toMatchSnapshot();
    });
});



