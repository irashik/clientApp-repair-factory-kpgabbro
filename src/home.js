

import React from "react";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


class HomeComponent extends React.Component {

  

    render() {
      return (
        <Container fluid >
          <Row>
            <h2>Это вэб приложения для ведения журнала ремонта оборудования.</h2>
          <p>Что-нибудь еще....</p>


          </Row>
        </Container>
      );
    };
};



export default HomeComponent;
