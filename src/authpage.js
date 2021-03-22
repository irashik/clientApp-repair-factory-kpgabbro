// Страница авторизации
/*

Пользователь вводит емейл и пароль и нажимает кнопку
далее ...?

*/

import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';




class AuthComponent extends React.Component {
    render() {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Авторизуйтесь</h2>
          </Row>
          <Row>
                    

            <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">

                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
                        
           </Row>

        </Container>
      );
    };
};









export default AuthComponent;


