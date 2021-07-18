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
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";


function AuthComponent() {
  
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      function handeEmailChange(event) {
        setEmail(event.target.value);
      }

      React.FormEvent



      const handleSubmit = (e) => {
        e.preventDefault();
        
      }

      return (
  


        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Авторизуйтесь</h2>
          </Row>
         
          <Row>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" 
                  value = {email}
                  onChange = {(e) => setEmail(e.target.value)}  />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password"
                    value = {password}
                    onChange = {(e) =>setPassword(e.target.value)} />
              </Form.Group>
          
              <Button variant="primary" type="submit" >
                  Вход
              </Button>
            </Form>
           </Row>
        </Container>

      );
    


};










export default AuthComponent;


