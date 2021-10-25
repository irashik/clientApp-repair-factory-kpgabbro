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
import { useCookies} from 'react-cookie';



function AuthComponent() {
  
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const [cookieAcces, setCookieAcces] = useCookies(['accessToken']);
      const [cookieRef, setCookieRef] = useCookies(['refreshToken']);

      const handleSubmit = (e) => {
        e.preventDefault();
        // отправить на сервер запрос
        
        const data = {
          email: email,
          password: password
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

        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/login"


        fetch(url, options)
        .then(res => res.json())
        .then(result => {
            // должны получить web tokens
               /*
            проверить статус и если статус 200 то ==>
            нужно записать аксестокен в цокиес
            нужно запписать рефрештокен в локальное хранилище
            редирект на главную страницу

            Если статуст 500 тоже
            Если статус 401 то ==>
              сообщение об ошибке опказать
            */

            console.log(JSON.stringify(result));

            if (result.status === 200) {

              // что делаем дальше?
              /* записываем токены в локальное хранилище
                  переадресовываем на главную страницу
              */

                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                localStorage.setItem('userName', result.userName);
                localStorage.setItem('userId', result.userId)

                // по рекомендациям лучше хранить в куках!
                
                //setCookieAcces('accessToken', result.accessToken, { path: '/'});

                window.location = '/';

                



            } else {
              alert(JSON.stringify(result));
              
            }
         

          //   {
          //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbWEiLCJlbWFpbCI6ImRpbWFAdGVzdC5ydSIsInN1YiI6IjYwYjMzNzRmZWUxOTEyYzk5MDliOWY1OSIsImlhdCI6MTYyNjU5MTk2MCwiZXhwIjoxNjI2NTkyNTYwfQ.X88roXl1a3gUfSIBsoNXM5Y4XjISjP54JZHK80IbUkM",
          //     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGIzMzc0ZmVlMTkxMmM5OTA5YjlmNTkiLCJpYXQiOjE2MjY1OTE5NjAsImV4cCI6MTYzMTc3NTk2MCwiYXVkIjoidXNlcnMiLCJpc3MiOiJhcGktcmVwYWlyLWZhY3Rvcnkta3BnYWJicm8ifQ.Y8jPgLyk2F9kgZ9jDT0gyBM0BnNe6QGlmm3hIG_1QyE",
          //     "status": 200
          // }


          //   {
        //     "statusCode": 401,
        //     "message": "Unauthorized"
        // }


          },
          error => {
            // сообщение показать о том что вернул сервер
            alert('Ошибка сервера:  ' + error);
            // TypeError: NetworkError when attempting to fetch resource.

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
          
              <Button variant="primary" type="submit" >
                  Вход
              </Button>
            </Form>

           </Row>
        </Container>
      );
};
export default AuthComponent;


