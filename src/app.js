/*
  основной файл приложения (корневой элемент )
*/

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, 
          Route, 
          Switch,
       } from 'react-router-dom';


import './scss/app.scss';

import NavbarPage from './navbarpage.js';
import HeaderComponent from './header.js';
import FooterComponent from './footer.js';


import HomeComponent from './home.js';
import InputDataSection from './inputDataSection/inputDataSection.js';
import ReportEquipment from './reportEquipment.js';
import RepairPlan from './repairPlan/repairPlan.js';
import BidRequest from './bidRequest/bidRequest.js';
import AuthComponent from './authpage.js';
import RegisterComponent from './authRegister.js';
import ProfileUserComponent from './userProfile';




function App() {
  

  return (
    <Container fluid className="container-fluid">
      <HeaderComponent />
      
      <NavbarPage />

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
        <Route path="/profile">
          <Row>
            <ProfileUserComponent />
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
  )
};
export default App;
