
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
  const [position, setPostion] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      
      password: password,
      name: name
    }

    const accessToken = window.localStorage.getItem('accessToken');
    log.debug(accessToken);

    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': concat("Bearer " + accessToken)
      },
      redirect: 'follow',
     // body: JSON.stringify(data),
      
    };

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/users/profile"
    

    fetch(url, options)
      .then(res => res.json())
      .then(result => {
      
        return result;


      },
      error => {
      throw new Error();   

      });
  

  }


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

           


            <br>
            </br>
            <br>
            </br>
            <h4>Изменение пароля</h4>
            
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
            <Button variant="primary" type="submit">
                Сохранить
            </Button>
            </Form>
          </Row>


        </Container>
      );
  
};
export default ProfileUserComponent;



