
import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'

import { BrowserRouter as Router, 
          Route, 
          Switch,
          Link,
          NavLink,
          useParams,
          useRouteMatch,
          browserHistory
       } from 'react-router-dom';


import { LinkContainer } from  'react-router-bootstrap';


import { HeaderComponent } from './header.js';
import { FooterComponent } from './footer.js';

import InputDataSection from 'inputDataSection/inputDataSection.js';

import './scss/app.scss';

import HomeComponent from './home.js';
import ReportEquipment from './reportEquipment.js';
import RepairPlan from './repairPlan.js';
import BidRequest from './bidRequest.js';

import AuthComponent from './authpage.js';
import RegisterComponent from './authRegister.js';





const App = () => (
  <Container fluid className="container-fluid">
    <HeaderComponent />

   
      <Navbar bg="light" varian='light' expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand href="/">Журнал ремонтов</Navbar.Brand>
        </LinkContainer>
        

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to='/inputData'>
              <Nav.Link href="/inputData">Ввод данных</Nav.Link>
            </LinkContainer>
            <LinkContainer to='reportEquipment'>
              <Nav.Link href="/reportEquipment">Отчет по оборудованию</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/repairPlan'>
              <Nav.Link href="/repairPlan">План ремонтов</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/bidRequest'>
              <Nav.Link >Заявки и предложения</Nav.Link>
            </LinkContainer>

            <ButtonGroup className='col-5' aria-label='Basic example'>
            <LinkContainer to='/register'>
              <Button href='/register' variant="outline-secondary align-items-end btn-sm mr-2" id="AddEquipment">Register</Button>
            </LinkContainer>

            <LinkContainer to='/auth'>
                <Button href='/auth' variant="outline-secondary btn-sm mr-2" id="AddEquipment">Sign in</Button>
            </LinkContainer>

            </ButtonGroup>
            
            
            


          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Switch>
          <Route path="/inputData">
            <Row>
              <InputDataSection />
            </Row>
          </Route>
          <Route path="/reportEquipment">
            <Row>
              <ReportEquipment />
              
            </Row>
          </Route>
          <Route path="/repairPlan">
            <Row>
              <RepairPlan />

            </Row>
          </Route>
          <Route path="/bidRequest">
            <Row>
              <BidRequest />
            </Row>
            
          </Route>


          <Route path="/register">
            <Row>
              <RegisterComponent />
            </Row>
          </Route>


          <Route path="/auth">
            <Row>
              <AuthComponent />
            </Row>
          </Route>



          <Route path="/">
            <Row>
              <HomeComponent />
            </Row>
          </Route>





        </Switch>

   

    
    <FooterComponent />
  

  </Container>
);



export default App;
