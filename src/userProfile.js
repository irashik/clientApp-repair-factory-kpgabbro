
// Страница для регистрации
/*

Личный кабинет пользователя
  редактирование данных.
  Что-еще? посмотреть свои заявки и статус по ним
            заметки свои?




*/

import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { redirect } from "statuses";
import * as log from 'loglevel';
import { concat } from "lodash";



log.setLevel('debug');




function ProfileUserComponent() {


  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    log.debug('handleSubmit');


    if(password === password2) {




    } else {
      alert ('пароли не совпадают');
      return new Error('password not equal');
    }



    let data = {
      password: password,
      name: name,
      position: position
    }

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/users/profile"
    



  }



  function changePassword(e) {

    e.preventDefault();

    log.debug('click changePassword');

  };


      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Профиль пользователя</h2>
          </Row>

          <Row>
            <Form onSubmit={handleSubmit}>
        
            <Form.Group controlId="formBasicName">
                <Form.Label>Ваши Имя и Фамилия</Form.Label>
                <Form.Control type="text" placeholder="Фамилия и имя" 
                value={name}
                onChange = {(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="UserPosition">
                <Form.Label>Ваша должность</Form.Label>
                <Form.Control type="text" placeholder="Должность" 
                value={position}
                onChange = {(e) => setPosition(e.target.value)} />
            </Form.Group>
            <Form.Group>
              
              <br></br>
              <Button id='changeProfileBtn' variant="primary" type="submit">
                  Обновить данные
              </Button>
            </Form.Group>


          </Form>

            <br></br>
            <br></br>
            <br></br>

            <Row className="justify-content-md-center">
              <h4>Изменение пароля</h4>
            </Row>
            

            <Form onSubmit={changePassword}>            
            
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Введите новый пароль</Form.Label>
                <Form.Control type="password" placeholder="New Password" 
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}  />
            </Form.Group>

            <Form.Group controlId="formBasicPassword2">
                <Form.Control type="password" placeholder="Retry new password" 
                value = {password2}
                onChange = {(e) => setPassword2(e.target.value)}  />
            </Form.Group>
            <br>
            </br>
            <Button id='changePasswordBtn' variant="secondary" type="submit">
                Сменить пароль
            </Button>
            </Form>
          </Row>


        </Container>
      );
  
};
export default ProfileUserComponent;



