// Отчет по планируемым работам


import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import InputPlanRepairForm from "./inputPlanRepairForm";
import ReadPlansListModule from "./readPlansListModule";
import SearchList from "../searchListUnitEquipment";
import { useDebouncedCallback } from 'use-debounce';



function RepairPlan(props) {

  const [modalShow, setModalShow] = useState(false);
  const [addedPlan, setAddedPlan] = useState([]);
  const [statusState, setStatusState] = useState('');
  const [searchString, setSearchString] = useState('');
  const [filter, setFilter] = useState('');
  const [idEquipment, setIdEquipment] = useState('');



  const debouncedSetFilter = useDebouncedCallback(
      filter => setFilter(filter),
      process.env.DEBOUNCEDDELAY

  );
  function onChangeSearch(e) {
      const { value } = e.target
      setSearchString(value);
      debouncedSetFilter(value);
      setIdEquipment(null)

  };
  function handlerSelectEquipment(id, joinNameUnit, e) {
    setSearchString(joinNameUnit);
    setIdEquipment(id);
    
  };
  function onHandleAddedPlan() {
    setAddedPlan([...addedPlan, 1]);
  };
  


    
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col><h2>План ремонтов</h2></Col>
        <Col></Col>
        <Col xs={2}>
            <Button variant="primary" 
                    id="AddPlanRepair"
                    className="" 
                    onClick={() => setModalShow(true)}>
                    Добавить задачу</Button>
        </Col>
      </Row>
      <Row>
        <Col sm={4} id='bidRequestFilter'>
          <label>Фильтр по статусу задачи</label>
          <Form.Control as='select' size="sm" aria-label="Выберите статус задачи"
                        value={statusState}
                        onChange={(e) => setStatusState(e.target.value)}   >

                            <option value=''> -- select an option -- </option>
                            <option value="DRAFT">Черновик</option>
                            <option value="CANCELLED">Отменено</option>
                            <option value="FINISHED">Завершено</option>
                            <option value="DEFERRED">Отложено</option>
                            <option value="INWORK">В работе</option>
                            <option value="ACTIVE">Активная</option>
          </Form.Control>
        </Col>
        <Col sm={4}>
          <label>Фильтр по оборудованию</label>
          <Form.Control
                    id='inputEquipment' size="sm" type="text" 
                    placeholder="Выберите оборудование"
                    value={searchString}
                    onChange={onChangeSearch}
                    title={idEquipment} >
          </Form.Control>
          <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
          <br></br>
        </Col>
      </Row>
        <InputPlanRepairForm    show={modalShow} 
                                onHide={() => setModalShow(false)}
                                handleAddedPlan={onHandleAddedPlan}
                                //resetIdRecord={() => {return null}}
                                
        />
        <ReadPlansListModule    onAddedPlan={addedPlan} 
                                onSelectEquipment={idEquipment} 
                                onSelectStatus={statusState}
        />
    </Container>
  );
};
export default RepairPlan;

