import React, { useState, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as log from 'loglevel';
import { loadFromDb } from './utils/loader';

log.setLevel('debug');



function NavbarPage() {

  return (
    <Navbar expand="sm" className='navbar-custom' >


      <Navbar.Brand href="/">Журнал ремонтов</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
              <Nav.Link href="/inputData" id='inputData'>Ввод данных</Nav.Link>
              <Nav.Link href="/reportEquipment" id="reportEquipment">Отчет по оборудованию</Nav.Link>
              <Nav.Link href="/repairPlan" id="repairPlan">План ремонтов</Nav.Link>
              <Nav.Link href='/bidRequest' id="bidRequest">Заявки снабжение</Nav.Link>
              <AuthButton />
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  )
};
export default NavbarPage;


function AuthButton() {

  const user = window.localStorage.getItem('userName');
  const accessToken = window.localStorage.getItem('accessToken');
  const userId = window.localStorage.getItem('userId');
  const refreshToken = window.localStorage.getItem('refreshToken');
  

  function onClickLogout() {

    // сначала проверь логин.

    const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/logout");
    url.searchParams.set('userId', localStorage.getItem('userId'));
    url.searchParams.set('userName', localStorage.getItem('userName'));

    loadFromDb(url)
      .then(response => {
        window.localStorage.clear();
        alert(response.res);
        const homeUrl = new URL (process.env.HTTP_CLIENT_HOST + ":" + process.env.HTTP_CLIENT_PORT);
        location.href = homeUrl;
      })
      .catch(err => {
        window.localStorage.clear();
        
        alert('Logout Error: ' + JSON.stringify(err));
        
        throw new Error('Logout not successfully');
      });

  }



  if(user && userId && accessToken && refreshToken) {
    return (
      <ButtonGroup size='sm' className='col-4' aria-label='Basic example'>
        <Nav.Link href='/profile'>
          <p id='labelUserNameNav'>Hello, <strong>{user}</strong></p>
        </Nav.Link>

        <Button size="sm" variant="outline-secondary" className='m-2'
                id="LogoutBtn" onClick={onClickLogout}>Выход
        </Button>
      </ButtonGroup>
    )
  } else {
    return (
      <ButtonGroup className='col-5' aria-label='Basic example'>
        <Nav.Link href='/register'>
          <Button variant="outline-secondary align-items-end btn-sm mr-2" 
                  id="registerButton">Register</Button>
        </Nav.Link>

        <Nav.Link href='/auth'>
          <Button variant="outline-secondary btn-sm mr-2" id="loginButton">Sign in</Button>
        </Nav.Link>
      </ButtonGroup>
    )
  }
};