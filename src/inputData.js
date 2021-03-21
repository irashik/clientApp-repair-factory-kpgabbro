
import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';

import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);


import "react-datepicker/dist/react-datepicker.css";


class InputData extends React.Component {


    render() {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
              
            <Col>
               <Example />
               <h2>Что сделано?</h2>
            </Col>
          
           
          </Row>

          <Row>
              <InputModule />
          </Row>
          <Button variant="outline-secondary" id="AddEquipment">Добавить оборудование</Button>
           
           <ReadModule />
        </Container>
      
      )
  
    }
    


}


const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker locale="ru" 
            selected={startDate}
            onChange={date => setStartDate(date)} />
    );

};

function InputModule() {
    return   (    
    <Container fluid id='input-module'>
        <Row>
            <Col sm={4}>
                <Form.Control id='inputEquipment' size="sm" type="text" placeholder="Выберите оборудование"  />
            </Col>
            <Col>
                <Form.Control id='inputRepair' as='textarea' size="sm" rows={3} placeholder="Что сделано?"  />
            </Col>
            <Col sm={2}>
                <InputGroupButtonSmall name="Equipment" />
            </Col>
        </Row>
        <Row>
            
            <Col>
               <Form.Control id='inputMaterial' size="sm" type="text" placeholder="Введите материал"  />
            </Col>
            <Col sm={4} >
                <Form.Control id='inputMaterial' size="sm" type="text"  placeholder="Введите его количество"  />
            </Col>
            <Col sm={2}>
              <InputGroupButtonSmall name="Material" />
            </Col>
        </Row>
    </Container>
    
    );
};


function ReadModule() {
    return      (
        <Container fluid id='read-module'>
        <Row>
            <Col sm={4}>
                <p>Empty</p>
            </Col>
            <Col>
                <p>Empty</p>
            </Col>
            <Col sm={2}>
               <InputGroup.Checkbox aria-label="Checkbox for following text input" disabled/>

            </Col>
        </Row>
        <Row>
            <Col>
                <p>Empty</p>
            </Col>
            <Col sm={4}>
                <p>Empty</p>
            </Col>
            <Col sm={2}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" disabled/>
            </Col>
        </Row>
        <Button variant="outline-dark" data-toggle="tooltip" data-placement="top" title="Редактировать">1</Button>

    </Container>

    );
};


function InputGroupButtonSmall(props) {
    return (

        <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input"
        data-toggle="tooltip" data-placement="top" title="Если планируется" />
        <Button variant="outline-dark" data-toggle="tooltip" data-placement="top" title="Добавить">+</Button>
        </InputGroup>


    );
};




export default InputData;


