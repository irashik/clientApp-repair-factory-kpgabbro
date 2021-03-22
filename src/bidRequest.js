// Страница заявок и предложений
/*
пользователь может добавить новую заявку
Пользователь видит все заявки

*/

import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';




class BidRequest extends React.Component {
    render() {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Заявки и предложения</h2>
          </Row>
          <Row>
           
                <Form.Control id='createBid' as='textarea' rows={3} placeholder="Создайте заявку"  />
                <Button id='btnCreateBid' variant="primary">Создать</Button>
           


          </Row>
          <Row>
            <BidRequestModule />
          </Row>
        </Container>
      );
    };
};





function BidRequestModule() {
    return      (
        <Container fluid id='plan-read-module'>
       
        <Row>
            <Col sm={2}>
            <p>Дата</p>
            <p>Автор</p>
            </Col>
            <Col>
                <p>Описание заявки</p>
                <div item=""></div>
            </Col>
            <Col sm={2}>
               <InputGroup.Checkbox aria-label="Checkbox for following text input" data-toggle="tooltip" data-placement="top" title="Выполнено" />
                <p> Статус заявки</p>
            </Col>
        </Row>
        

    </Container>

    );
};





export default BidRequest;

