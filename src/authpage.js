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







let userEmail = null;
let userPassword = null;


class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

   // this.handleChange = this.handleChange1.bind(this);
    this.handleChange = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };



  // handleChange1(event) {
  //   console.log(event.target.value);

  //   const target = event.target;

  //   const value = target.type === 'email' ? target.email : target.password;


  //   const name = target.name;

  //   this.setState({[name]: value});
    

  // }

  handleChange2(event) {
    console.log(event.target.value);
    this.setState({password: event.target.value});
  }


  // handleClick = buttonName => {
  //   this.props.clickHandler(buttonName);
  // };




 handleSubmit(event) {
      event.preventDefault();
      alert('отправленные данные' + this.state.email + "&& " + this.state.password);

  }

  // componentDidMount() {
  //   const data = {
  //     email: userEmail,
  //     password: userPassword
  //   }


  //   const options = {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentialls: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     redirect: 'follow',
  //     body: JSON.stringify(data)
  //   };

  //   fetch("http://localhost:3000/auth/login", options)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //       this.setState({
  //         isLoaded: true,
  //         items: result.items
  //       });
  //     },
  //     (error) => {
  //       this.setState({
  //         isLoaded: true,
  //         error
  //       });
  //     }
  //     )
    
  // }


    render() {
      return (
  


        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Авторизуйтесь</h2>
          </Row>
         
          <Row>
            <Form onSubmit={this.handleSubmit}>
              {/* <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" 
                  value={this.state.email}
                  onChange = {this.handleChange1}  />
              </Form.Group> */}

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password"
                    value={this.state.password}
                    onChange = {this.handleChange2} />
              </Form.Group>
          
              <Button variant="primary" type="submit" >
                  Вход
              </Button>
            </Form>
           </Row>
        </Container>

      );
    };


};










export default AuthComponent;


