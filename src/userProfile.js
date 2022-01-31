import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as log from 'loglevel';
import { loadFromDb, unloadInDbPatch } from "./utils/loader";


log.setLevel('debug');




function ProfileUserComponent() {
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState('');


  function handleSubmit(e) {
    e.preventDefault();

    let data = {
      password: password,
      name: name,
      position: position
    }

    const id = localStorage.getItem('userId');
    const url = new URL ( process.env.HTTP_API_HOST + ":" + 
                          process.env.HTTP_API_PORT + "/users/" + id);

     unloadInDbPatch(url, data).then(res => {

     })
     .catch(err => {
        throw new Error ('respnse from server', err);
     });
    



  };
  
  function changePassword(e) {
    e.preventDefault();


    if(password === password2) {
        //todo
    } else {
      alert ('пароли не совпадают');
      return new Error('password not equal');
    }




  };


  useEffect(() => {
    const id = localStorage.getItem('userId');
    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
    "/users/" + id);
    const queryServer = loadFromDb(url);

    queryServer
    .then(res => {
      setName(res.name);
      setPosition((res.position || ""));
      setEmail(res.email);
    })
    .catch(err => {
      throw new Error ('error from server', err);
    })
  }, []);



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

            <Form.Group controlId="UserPosition">
                <Form.Label>Ваш емаил</Form.Label>
                <Form.Control type="text" placeholder="email" disabled
                value={email}
                onChange = {(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Button id='changeProfileBtn' variant="primary" type="submit"
                        disabled                        >
                  Обновить данные
              </Button>
            </Form.Group>


          </Form>
          <Row>
          </Row>
          <Row>
          </Row>




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
            <Button id='changePasswordBtn' variant="secondary" 
                    type="submit"
                    disabled
                    >
                Сменить пароль
            </Button>
            </Form>
          </Row>


        </Container>
      );
  
};
export default ProfileUserComponent;



