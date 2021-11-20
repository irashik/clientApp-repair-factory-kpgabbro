import React from 'react';
import { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import App  from './app';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, 
          Route, 
          Switch,
       } from 'react-router-dom';


//       import { expect } from 'jest';


jest.mock();


jest.mock('./navbarpage.js');
jest.mock('./header.js')
jest.mock('./footer.js')


jest.mock('./home.js');
jest.mock('./inputDataSection/inputDataSection.js');
jest.mock('./reportEquipment.js');
jest.mock('./repairPlan/repairPlan.js');
jest.mock('./bidRequest/bidRequest.js');
jest.mock('./authpage.js');
jest.mock('./authRegister.js');
jest.mock('./userProfile');



describe("<App/>", () => {
    test.only('should render correctly', () => {

        const component = shallow(<App />)
        expect(component).toMatchSnapshot();

        



        
    });

    
});