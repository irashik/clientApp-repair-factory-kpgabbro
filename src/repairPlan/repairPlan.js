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
  const [filterText, setFilterText] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [idEquipment, setIdEquipment] = useState('');
  const [importance, setImportance] = useState('');
  const [searchTextDescription, setSearchTextDescription] = useState('');
  const [searchTextTag, setSearchTextTag] = useState('');

  const debouncedSetFilter = useDebouncedCallback(
      filter => setFilter(filter),
      process.env.DEBOUNCEDDELAY
  );
  const debouncedSetFilterText = useDebouncedCallback(
    filterText => setFilterText(filterText),
    process.env.DEBOUNCEDDELAY
  )
  const debouncedSetFilterTag = useDebouncedCallback(
    filterTag => setFilterTag(filterTag),
    process.env.DEBOUNCEDDELAY
  )

  function onChangeSearch(e) {
      const { value } = e.target
      setSearchString(value);
      debouncedSetFilter(value);
      setIdEquipment(null)
  };

  function onChangeSearchDescription(e) {
    const {value} = e.target;
    debouncedSetFilterText(value);
    setSearchTextDescription(value);
  }

  function onChangeSearchTag(e) {
    const {value} = e.target;
    debouncedSetFilterTag(value);
    setSearchTextTag(value);
  }

  function handlerSelectEquipment(id, joinNameUnit, e) {
    setSearchString(joinNameUnit);
    setIdEquipment(id);
  };

  function onHandleAddedPlan() {
    setAddedPlan([...addedPlan, 1]);
  };
  

    
  return (
    <Container fluid id='repairPlanComponent'>
      <Row className="justify-content-md-center">
        <Col xl={4}><h2>План ремонтов</h2></Col>
        <Col></Col>
        <Col xs={2}>
            <Button variant="primary" 
                    id="AddPlanRepair"
                    className="" 
                    onClick={() => setModalShow(true)}>
                    Добавить задачу</Button>
        </Col>
      </Row>
      <Row id="blockFilterString">
        <Col sm >
          <label>Фильтр по статусу задачи</label>
          <Form.Control id='inputFilterStatus'
                        as='select' size="sm" aria-label="Выберите статус задачи"
                        value={statusState}
                        onChange={(e) => setStatusState(e.target.value)}   >

                            <option value=''> -- select an option -- </option>
                            <option value="DRAFT">Заготовка</option>
                            <option value="CANCELLED">Отменено</option>
                            <option value="FINISHED">Завершено</option>
                            <option value="DEFERRED">Отложено</option>
                            <option value="INWORK">В работе</option>
                            <option value="ACTIVE">Активная</option>
          </Form.Control>
        </Col>
        <Col sm>
          <label>Фильтр по оборудованию</label>
          <Form.Control
                    id='inputEquipment' size="sm" type="text" 
                    placeholder="Выберите оборудование"
                    value={searchString}
                    onChange={onChangeSearch}
                    title={idEquipment} >
          </Form.Control>
          <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
        </Col>
        <Col sm>
          <label>Фильтр по описанию</label>
          <Form.Control
                    id='inputFilterDescription' size="sm" type="text" 
                    placeholder="Текст для поиска"
                    value={searchTextDescription}
                    onChange={onChangeSearchDescription}
                    >
          </Form.Control>
        </Col>
        <Col sm>
          <label>Фильтр по тэгу</label>
          <Form.Control
                    id='inputFilterTag' size="sm" type="text" 
                    placeholder="Текст для поиска по тэгу"
                    value={searchTextTag}
                    onChange={onChangeSearchTag}
                    >
          </Form.Control>
        </Col>
        <Col sm>
          <label>Фильтр по важности</label>
          <Form.Control
                    id='inputFilterImportance'
                    as='select' size="sm" aria-label="Выберите статус задачи"
                    placeholder="Выберите категорию"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)} >
                    
                    <option value=''> -- select an option -- </option>
                    <option value="A">Важно-срочно</option>
                    <option value="B">Важно-несрочно</option>
                    <option value="C">Срочно-неважно</option>
                    <option value="D">Несрочно-неважно</option>
          </Form.Control>
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
                                onSelectImportance={importance}
                                onSelectDescription={filterText}
                                onSelectTag={filterTag}

        />
    </Container>
  );
};
export default RepairPlan;

