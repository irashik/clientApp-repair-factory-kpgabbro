import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {  Route, Routes, BrowserRouter  } from 'react-router-dom';


import './scss/app.scss';

import NavbarPage from './navbarpage.js';
import HeaderComponent from './header.js';
import FooterComponent from './footer.js';
import HomeComponent from './home.js';

import ReportEquipment from './reportEquipment.js';
import RepairPlan from './repairPlan/repairPlan.js';
import BidRequest from './bidRequest/bidRequest.js';
import AuthComponent from './authpage.js';
import RegisterComponent from './authRegister.js';
import ProfileUserComponent from './userProfile';
import InputDataSection from './inputDataSection/inputDataSection';



function App() {
  

  return (
    <Container fluid className="container-fluid" id='bodyPage'>
      <HeaderComponent />
      
      <NavbarPage />

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<HomeComponent /> } />
          <Route path="/inputData" element={<InputDataSection />} />
          <Route path="/reportEquipment" element={<ReportEquipment />} />
          <Route path="/repairPlan" element={<RepairPlan /> } />
          <Route path="/bidRequest" element={<BidRequest /> } />
          <Route path="/register" element={<RegisterComponent /> } />
          <Route path="/profile" element={<ProfileUserComponent /> } />
          <Route path="/auth" element={<AuthComponent />} />
          
          
            
        </Routes>
      </BrowserRouter>


      <FooterComponent />
    </Container>
  )
};
export default App;
