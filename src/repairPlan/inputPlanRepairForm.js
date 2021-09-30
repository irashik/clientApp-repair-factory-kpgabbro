
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';



import Form from 'react-bootstrap/Form';

import { TiPen } from 'react-icons/ti';
import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDebouncedCallback } from 'use-debounce';

import ru from 'date-fns/locale/ru';
import {format, getMonth} from 'date-fns';

registerLocale('ru', ru);

import SearchList from "../searchListUnitEquipment";

import * as log from 'loglevel';
log.setLevel('debug');

import jQuery from 'jquery';





function InputPlanRepairForm(props) {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');


    const [repairCount, setRepairCount] = useState([]);
    const [materialCount, setMaterialCount] = useState([]);

    // const [dataStart, setDataStart] = useState('');
    // const [dataEnd, setDataEnd] = useState('');

    const [spendingJob, setSpendingJob] = useState(0);


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

    const onClickAddedPlan = () => {
               
        props.handleAddedPlan(true);

        // собрать данные из полей
        // записать в базу
        // очистить поля


    };
    

    function onHandleRepairCount() {
        setRepairCount([...repairCount, 1]);
        console.log(repairCount);
    }

    function onHandleMaterialCount() {
        setMaterialCount([...materialCount, 1]);
        console.log(materialCount);
    }





    const onSelectOptedDataStart = (selectedDate) => {
        setDataStart(selectedDate);
    }

    const onSelectOptedDataEnd = (selectedDate) => {
        setDataEnd(selectedDate);
    }






    return(    
        <Modal {...props} 
            backdrop="static"
            dialogClassName='modal-fullscreen'
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма ввода данных о плановых работах
                </Modal.Title>


            </Modal.Header>


            <Modal.Body className="show-grid">
                <Container fluid id='input-module'>
                   
                    <Row>
                        <Col>
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
                    
                        <Col md={6}>
                            <FormInputRepair count={repairCount} />
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall name="repair" onHandleRepairCount={onHandleRepairCount} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormInputMaterial count={materialCount} />
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall name="material" onHandleMaterialCount={onHandleMaterialCount} />
                        </Col>
                    </Row>


                    <Row>
                        <label>Статус задачи</label>
                        <Form.Control as='select' size="sm" aria-label="Выберите статус задачи">
                                <option value="DRAFT">Черновик</option>
                                <option value="CANCELED">Отменено</option>
                                <option value="FINISHED">Завершено</option>
                                <option value="DEFERRED">Отложено</option>
                                <option value="INWORK">В работе</option>
                            </Form.Control>
                       
                    </Row>
                    <Row>
                        <Form.Control 
                                    id='inputPriority' size="sm" type="text" 
                                    placeholder="Приоритетность задачи"/>
                        </Row>
                    




                    <Row>
                        <Form.Control id='inputComment' size="sm" as="textarea" rows={3} 
                                        placeholder="Комментарии"/>
                    </Row>

                    <Row>
                        <Form.Control 
                                id='inputSpendingJob' size="sm" pattern="[0-9]*" 
                                type="text" 
                                placeholder="Ориентировочные трудозатраты"
                                
                                onChange={(e)=> setSpendingJob(e.target.value)}
                                value={spendingJob}
                                />
                    </Row>

                    
           
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                            id="AddRepairEquipment"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickAddedPlan}

                            
                            >
                    Записать
                </Button>

            </Modal.Footer>
        </Modal>        
    )
};
export default InputPlanRepairForm;




function InputGroupButtonSmall(props) {

    let onAddedRecord = null;

    if(props.name === "repair") {
        onAddedRecord = () => {
            props.onHandleRepairCount();
        }
    } 
    
    if (props.name === "material") {
       onAddedRecord = () => {
            props.onHandleMaterialCount();
        }
    }

    return (
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                className=""
                data-placement="top" 
                title="Добавить запись"
                id='btnAddDescription'
                onClick={() => onAddedRecord()}
                >+</Button>
    );
};



function FormInputRepair(props) {
    const [count, setCount] = useState([]);

    useEffect(() => {
        setCount([...count, 1])
        }, [props.count])


        function result(i) {
            return(
                <Form.Control id='inputRepairDescription' 
                 as='textarea' 
                key = {i}
                size="sm" rows={4} 
                placeholder="Что требуется сделать?"  />
    )
        }

    let arrayList = count.map((a, i) => result(i))
        
    

    return arrayList;
};

function FormInputMaterial(props) {
    const [count, setCount] = useState(props.count);

    useEffect(() => {
        setCount([...count, 1]);
    }, [props.count])
    
    let arrayList = count.map((a, i) => {
        return (
            <Row id='rowInputMaterial' key={i}>
                <Col>
                    <Form.Control id='inputMaterialName'  key={'name.'+i} size="sm" type="text" placeholder="Введите планируемый материал"  />
                </Col>
                <Col md={3}>
                    <Form.Control id='inputMaterialValue' key={'value.'+i} size="sm" type="text"  placeholder="Введите его количество"  />
                </Col>
                <Col md={3}>
                    <Form.Control id='inputMaterialDesc' key={'desc.'+i} size="sm" type="text"  placeholder="Примечание"  />
                </Col>
            </Row>
        )
    })
    return arrayList;
};

