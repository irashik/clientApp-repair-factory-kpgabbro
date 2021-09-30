// Отчет по планируемым работам


import React, { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


import InputPlanRepairForm from "./inputPlanRepairForm";
import ReadPlansListModule from "./readPlansListModule";


      import SearchList from "../searchListUnitEquipment";
      import { useDebouncedCallback } from 'use-debounce';



function RepairPlan(props) {

    const [modalShow, setModalShow] = useState(false);
    const [addedPlan, setAddedPlan] = useState(false);

    const [equipment, setEquipment] = useState('');
    const [selectStatus, setStatus] = useState('');


          const [searchString, setSearchString] = useState('');
          const [filter, setFilter] = useState('');
          const [idEquipment, setIdEquipment] = useState('');



          const delay = 400;

          const debouncedSetFilter = useDebouncedCallback(
              filter => setFilter(filter),
              delay
          );

          const onChangeSearch = (e) => {
              const { value } = e.target
              setSearchString(value);
              debouncedSetFilter(value);
              setIdEquipment(null)

          };





            const handlerSelectEquipment = (id, joinNameUnit, e) => {

              setSearchString(joinNameUnit);
              setIdEquipment(id);

              console.log("id=" +  id, "data= " + joinNameUnit);
          };



    const handleAddedPlan = (e) => {
      setAddedPlan(e);
  };

    useEffect(() => {
        setAddedPlan(false);
    }, []);


    
    return (
        <Container fluid>
          <Row className="justify-content-md-center">
              <Col><h2>План ремонтов</h2></Col>
            <Col></Col>
              <Col>
                <Button variant="primary" 
                        id="AddPlanRepair"
                        className="m-3" 
                        onClick={() => setModalShow(true)}>
                        Добавить планируемые работы</Button>
              </Col>
            </Row>
            <Row>
                <Col sm={4}>
                        <label>Фильтр по статусу задачи</label>
                        <Form.Control as='select' size="sm" aria-label="Выберите статус задачи">
                                <option value="DRAFT">Черновик</option>
                                <option value="CANCELED">Отменено</option>
                                <option value="FINISHED">Завершено</option>
                                <option value="DEFERRED">Отложено</option>
                                <option value="INWORK">В работе</option>
                            </Form.Control>
                       
                    </Col>
                    <Col sm={4}>
                      <label>Фильтр по оборудованию</label>
                      <Form.Control 
                                    id='inputEquipment' size="sm" type="text" 
                                    placeholder="Выберите оборудование"
                                    value={searchString}
                                    onChange={onChangeSearch}
                                    idunit={idEquipment}
                                    />
                            <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
                            <br></br>


                       
                       
                    </Col>

            </Row>

                <InputPlanRepairForm    show={modalShow} 
                                    onHide={() => setModalShow(false)}
                                    //handleAddedRepair={handleAddedRepair}
                                    />
            

                <ReadPlansListModule    onAddedPlan={addedPlan} 
                                        onSelectEquipment={equipment} 
                                        onSelectStatus={selectStatus}/>
        </Container>
      );
};
export default RepairPlan;

