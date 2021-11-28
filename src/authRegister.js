/*
* Страница для регистрации
* Пользователь вводит свои данные 
* по нажатию отправляются на сервер
*/

import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as log from 'loglevel';
import { unloadInDb } from "./utils/loader";

log.setLevel('debug');



function RegisterComponent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      name: name
    }

    const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/users/register");
    const request = unloadInDb(url, data);

    request
      .then(result => {
       
           // показать модальное и редирект на login.page
            alert("Вы успешно зарегистрировались!");
            const url = new URL (process.env.HTTP_CLIENT_HOST + ":" + process.env.HTTP_CLIENT_PORT + "/auth");
            document.location.href = url;
            setPassword("");
            setEmail("");
            setName("");

      })
      .catch(err => {
          alert(err);
      });

  ;}


      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Зарегистрируйтесь</h2>
          </Row>
          <Row>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email"
                value= {email}
                onChange = {(e) => setEmail(e.target.value)}  />
            </Form.Group>
            <Form.Group controlId="formBasicName">
                <Form.Control type="text" placeholder="Фамилия и имя" 
                value={name}
                onChange = {(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" 
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}  />
            </Form.Group>
            <Button variant="primary" 
                    type="submit"
                    id="registerSubmitBtn">
                Регистрация
            </Button>
            </Form>
          </Row>
        </Container>
      );
  
};
export default RegisterComponent;



