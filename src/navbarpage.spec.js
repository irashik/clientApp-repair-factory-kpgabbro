import React from 'react';
//import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';


import NavbarPage  from './navbarpage';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, 
          Route, 
          Switch,
       } from 'react-router-dom';


    //    import { LinkContainer } from  'react-router-bootstrap';
    //    import Button from 'react-bootstrap/Button';
    //    import ButtonGroup from 'react-bootstrap/ButtonGroup';
    //    import Nav from 'react-bootstrap/Nav';
    //    import Navbar from 'react-bootstrap/Navbar';


       jest.mock('react-router-bootstrap');
       jest.mock('react-bootstrap/Button');
       jest.mock('react-bootstrap/ButtonGroup');
      // jest.mock('react-bootstrap/Nav');
       // jest.mock('react-bootstrap/Navbar');



describe("<NavbarPage />", () => {
    test('should render correctly', () => {

        const component = shallow(<NavbarPage />)
        expect(component).toMatchSnapshot();



        
    });
});
