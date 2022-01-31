/*Страница авторизации
* Пользователь вводит емейл и пароль и нажимает кнопку
* 
*/

import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { unloadInDb } from "./utils/loader";



function AuthComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    const data = {
      email,
      password
    }
            
    const url = new URL(  process.env.HTTP_API_HOST + ":" + 
                          process.env.HTTP_API_PORT + "/auth/login");
    
    const load = unloadInDb(url, data);
    
    load
      .then(result => {

            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            localStorage.setItem('userName', result.userName);
            localStorage.setItem('userId', result.userId)

            //todo  по рекомендациям лучше хранить в куках!
                        
            const url = new URL ( process.env.HTTP_CLIENT_HOST + ":" + 
                                  process.env.HTTP_CLIENT_PORT + "/");

            document.location.href = url;
      })
      .catch(err => {
        alert(err);
      });

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
              <Button variant="primary" type="submit" id='signIn' >
                  Вход
              </Button>
            </Form>
           </Row>
        </Container>
      );
};
export default AuthComponent;


