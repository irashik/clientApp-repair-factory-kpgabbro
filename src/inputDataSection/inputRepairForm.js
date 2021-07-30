

import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader'


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





function InputModule(props) {

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

    const onClickAddedRepair = () => {
        
        
        props.handleAddedRepair(true);

        // собрать данные из полей
        // записать в базу
        // очистить поля


    };




    return   (    
        <Container fluid id='input-module'>
            <Row>
                <Col sm={4}>
                    <Form.Control 
                            id='inputEquipment' size="sm" type="text" 
                            placeholder="Выберите оборудование"
                            value={searchString}
                            onChange={onChangeSearch}
                            idunit={idEquipment}

                            />
                    
                    <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />

                </Col>
               
                <Col>
                    <Form.Control id='inputRepairDescription' as='textarea' size="sm" rows={3} placeholder="Что сделано?"  />
                </Col>
                    <Col sm={1}>
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
        <Row>
            <Col md='auto'>
            <Button variant="primary" 
                    id="AddRepairEquipment"
                    className="m-3 d-grid gap-2" 
                    onClick={() => onClickAddedRepair()}
                    
                    >
                    Записать</Button>
            </Col>
            
        </Row>
    

    </Container>
    
    )
    
};


export default InputModule;