
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
import Modal from 'react-bootstrap/Modal';
import { redirect } from "statuses";




function RegisterComponent() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      name: name
    }

    console.log('send ' + JSON.stringify(data));

    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      redirect: 'follow',
      body: JSON.stringify(data),
      
    };

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/users/register"
    console.log('url: ' + url);


    fetch(url, options)
      .then(res => res.json())
      .then(result => {
        console.log(JSON.stringify(result));
      
        if(result.created) {
      
          //   {
            //     "confirmation": false,
            //     "verifed": false,
            //     "admin": false,
            //     "_id": "60f5c20eb7938bec3103afc3",
            //     "email": "tanya@test.ru",
            //     "password": "$2b$10$Uk9t7WLUKu4hwPowjtnqsuCkNxe9Tre7uMi2le57ovlYQouwFWKBu",
            //     "name": "tanya",
            //     "created": "2021-07-19T18:18:54.168Z",
            //     "__v": 0
            // }

          // показать модальное и редирект на login.page
            alert("Вы успешно зарегистрировались!");
            const url = process.env.HTTP_CLIENT_HOST + ":" + process.env.HTTP_CLIENT_PORT + "/auth"
            document.location.href = url;


          




        } else {
          alert(result);
            // {"statusCode":403,"timestamp":"2021-07-20T05:31:17.698Z","message":"E11000 duplicate key error collection"}
            // {"statusCode":400,"message":["name should not be empty","password should not be empty"],"error":"Bad Request"}
            // {"statusCode":400,"message":["password should not be empty"],"error":"Bad Request"}
            // {"statusCode":400,"message":["email must be an email","email should not be empty"],"error":"Bad Request"}
        }

     

      


        setPassword("");
        setEmail("");
        setName("");


      },
      error => {
          alert(error);


      });
  

  }



  
    


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
            
            <Button variant="primary" type="submit">
                Регистрация
            </Button>
            </Form>
          </Row>


        </Container>
      );
  
};
export default RegisterComponent;



