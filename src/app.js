
import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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

import InputData from './inputData.js';

import './app.scss';
import HomeComponent from './home.js';
import ReportEquipment from './reportEquipment.js';



class Welcome extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )

  }
}

function Example()  {
  return (
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Oh snap! You got an error!</strong>
      <p>
        Change this and that and try again.
      </p>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}









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
            <LinkContainer to='bidRequest'>
              <Nav.Link >Заявки и предложения</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


      <Switch>
          <Route path="/inputData">
            <Row>
              <InputData />
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

          <Route path="/">
            <Row>
              <HomeComponent />
            </Row>
            
          </Route>
        </Switch>

   

    
    <FooterComponent />
  

  </Container>
);




function RepairPlan() {
  return <h2>RepairPlan</h2>;
}




function BidRequest() {
  return <h2>BidRequest</h2>;

}

export default App;
