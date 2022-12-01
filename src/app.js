import React, {Suspense, lazy} from 'react';
import Container from 'react-bootstrap/Container';
import {  Route, Routes, BrowserRouter  } from 'react-router-dom';

import NavbarPage from './navbarpage.js';
import HeaderComponent from './header.js';
import FooterComponent from './footer.js';
import HomeComponent from './home.js';

import AuthComponent from './authpage.js';
import RegisterComponent from './authRegister.js';
import ProfileUserComponent from './userProfile';
import ReportEquipment from './reportEquipment.js';

const InputDataSection = lazy(() => import('./inputDataSection/inputDataSection'));
const RepairPlan = lazy(() => import('./repairPlan/repairPlan.js'));
const BidRequest = lazy(() => import('./bidRequest/bidRequest.js'));;




function App() {
  

  return (
    <Container fluid className="container-fluid" id='bodyPage'>
      <HeaderComponent />
      
      <NavbarPage />

      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
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
        </Suspense>
      </BrowserRouter>


      <FooterComponent />
    </Container>
  )
};
export default App;
