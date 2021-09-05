// Отчет по планируемым работам


import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';








class RepairPlan extends React.Component {


    render() {
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>План ремонтов</h2>
          </Row>
          <Row>
            <RepairPlanModule />
          </Row>
        </Container>
      );
    };
};





function RepairPlanModule() {
    return      (
        <Container fluid id='plan-read-module'>
        <Row>
            <h5>Оборудование ЧЧЧ</h5>
        </Row>
        
        <Row>
            <Col sm={4}>
            <p>Дата</p>
            <p>Автор</p>
            </Col>
            <Col>
                <p>Планируемые работы</p>
                <div item=""></div>
            </Col>
            <Col sm={2}>
               <InputGroup.Checkbox aria-label="Checkbox for following text input" data-toggle="tooltip" data-placement="top" title="Выполнено" />

            </Col>
        </Row>
        {/* <Row>
            <Col item="" id='plan-material-module'>
                <p>Наименование материала</p>
            </Col>
            <Col sm={4}>
                <p>Количество материала</p>
            </Col>
            <Col sm={2}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" data-toggle="tooltip" data-placement="top" title="Выполнено"/>
            </Col>
        </Row> */}

    </Container>

    );
};
export default RepairPlan;


//<ArrayRepairPlan repairPlan={props.i.repairPlan} />
//<ArrayMaterialPlan materialPlan={props.i.materialPlan} />


function ArrayRepairPlan(props) {

  const resultArray = props.repairPlan.map((i, a) => {
      return (
          <Row>Плановые работы {a+1}:
              <Col sm={4} key={i._id}>
                  Описание: {i.description}
              </Col>
                  {showDateFinish}
          </Row>
      )


      function showDateFinish() {
          if(i.finish) {
              return (
                  <Col>
                      Дата выполнения: {i.dateFinish};
                  </Col>
              );
          } else {
              return null;
          };
      
      }


      
  });

  return resultArray
  

  
};



function ArrayMaterialPlan(props) {

  const resultArray = props.materialPlan.map((i, a) => {
      return (
          <Row>Планируемые материалы {a+1}:
              <Col sm={4} key={i._id}>            
                  Материал:    {i.nameMaterial}
              </Col>
              <Col sm={4} >
                  Количество: {i.valueMaterial}
              </Col>
              {showDateFinish}
          </Row>
      )

      function showDateFinish() {
          if(i.finish) {
              return (
                  <Col>
                      Дата выполнения: {i.dateFinish};
                  </Col>
              );
          } else {
              return null;
          };
      
      }

      
  });

  return resultArray;

 
};