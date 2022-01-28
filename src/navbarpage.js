import React, { useState, Fragment } from 'react';
import { LinkContainer } from  'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as log from 'loglevel';
import { loadFromDb } from './utils/loader';


log.setLevel('debug');



function NavbarPage() {

  return (
    <Navbar bg="light" varian='light' expand="sm">
      <LinkContainer to="/">
        <Navbar.Brand href="/">Журнал ремонтов</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer id='inputData' to='/inputData'>
              <Nav.Link href="/inputData">Ввод данных</Nav.Link>
            </LinkContainer>
            <LinkContainer id='reportEquipment' to='reportEquipment'>
              <Nav.Link href="/reportEquipment">Отчет по оборудованию</Nav.Link>
            </LinkContainer>
            <LinkContainer id='repairPlan' to='/repairPlan'>
              <Nav.Link href="/repairPlan">План ремонтов</Nav.Link>
            </LinkContainer>
            <LinkContainer id='bidRequest' to='/bidRequest'>
              <Nav.Link href='/bidRequest'>Заявки снабжение</Nav.Link>
            </LinkContainer>
            
            <AuthButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};
export default NavbarPage;


function AuthButton() {

  const user = localStorage.getItem('userName');

  function onClickLogout() {

    const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/logout");
    url.searchParams.set('userId', localStorage.getItem('userId'));
    url.searchParams.set('userName', localStorage.getItem('userName'));

    

    loadFromDb(url)
      .then((response) => {
        alert('Logout is successfully!');
        
        console.log(response);

        localStorage.clear();
        const homeUrl = new URL (process.env.HTTP_CLIENT_HOST + ":" + process.env.HTTP_CLIENT_PORT + "/");
        document.location.href = homeUrl;

      })
      .catch(err => {
        alert('Logout Error: ' + err);
        localStorage.clear();
        throw new Error('Logout not successfully');

      });
  }



  if(user) {
    return (
      <ButtonGroup size='sm' className='col-4' aria-label='Basic example'>
        <LinkContainer to='/profile'>
          <p id='labelUserNameNav'>Hello, <strong>{user}</strong></p>
        </LinkContainer>
        <Button size="sm" variant="outline-secondary" className='m-2'
                id="LogoutBtn"
                onClick={onClickLogout}>
                  Выход</Button>
      </ButtonGroup>
    )
  } else {
    return (
      <ButtonGroup className='col-5' aria-label='Basic example'>
        <LinkContainer to='/register'>
          <Button href='/register' variant="outline-secondary align-items-end btn-sm mr-2" 
                  id="registerButton">Register</Button>
        </LinkContainer>
        <LinkContainer to='/auth'>
          <Button href='/auth' variant="outline-secondary btn-sm mr-2" id="loginButton">Sign in</Button>
        </LinkContainer>
      </ButtonGroup>
    )
  }
};