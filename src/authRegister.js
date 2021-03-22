
// Страница для регистрации
/*

Пользователь вводит свои данные 
по нажатию отправляются на сервер



*/

import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';




class RegisterComponent extends React.Component {
    render() {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Зарегистрируйтесь</h2>
          </Row>
          <Row>
                    

            <Form>


            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email" />
            </Form.Group>


            <Form.Group controlId="formBasicName">
                <Form.Control type="text" placeholder="Фамилия и имя" />
            </Form.Group>


            <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            
            <Button variant="primary" type="submit">
                Регистрация
            </Button>
            </Form>
                        
           </Row>

        </Container>
      );
    };
};









export default RegisterComponent;


