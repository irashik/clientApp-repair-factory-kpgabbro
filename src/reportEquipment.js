// Отчет по оборудованию


import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';








class ReportEquipment extends React.Component {


    render() {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
              <h2>Отчет по оборудованию</h2>
          </Row>

            <Row className="justify-content-start">
                <Form.Control id='reportInputEquipment' size="sm" type="text" placeholder="Выберите оборудование"  />
            </Row>

            <Row>
                <ReportEquipmentModule />

            </Row>
           
        </Container>
      
      )
  
    }
    


}





function ReportEquipmentModule(props) {
    return      (
        <Container fluid id='read-module' item=''>
        <Row>
            <Col sm={4}>
                <h5 id='reportDateRepair' item=''>Дата ХX.XX.XXXX</h5>
                 <p id='reportRepairAuthor' item=''>Автор</p>
            </Col>
            <Col>
                <p>Выполненные работы</p>
                <div id='reportRepairDescription' 
                        item="">

                        </div>
            </Col>
            <Col sm={2}>
               <InputGroup.Checkbox aria-label="Checkbox for following text input" 
                                    data-toggle="tooltip" 
                                    data-placement="top" 
                                    title="Планирование"
                                    id='ReportRepairCheckPlan'
                                    item=''
                                     disabled/>

            </Col>
        </Row>
        {/* <Row>
            <Col>
                <p>Наименование материала</p>
            </Col>
            <Col sm={4}>
                <p>Количество материала</p>
            </Col>
            <Col sm={2}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" data-toggle="tooltip" data-placement="top" title="Планирование" disabled/>
            </Col>
        </Row> */}

    </Container>

    );
};





export default ReportEquipment;


