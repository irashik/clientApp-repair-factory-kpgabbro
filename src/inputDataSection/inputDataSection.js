
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

import InsertDataModal from "./modalWindow";
import ReadModuleList from './readModuleList';


function InputDataSection(props) {

    const [repair, setRepair] = useState('');
    const [optedData, setOptedData] = useState('');
    const [addedRepair, setAddedRepair] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    
    // если нет в лок хранилище или срок использованиея..
    // проверка что вернуля не null? обработка ошибок?
    // await getUnitEquipmentList();
    //console.log('localstorage.setitem' + this.state.resultKeyListEquipment);
    //localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
   

    const onSelectOptedData = (selectedDate) => {
        setOptedData(selectedDate);
    }

    const handleAddedRepair = () => {
        setAddedRepair(true);
    };


    useEffect(() => {
        setAddedRepair(false);
    }, []);


    return (
        <Container fluid className="p-0">
            <Row className="justify-content-md-center">
                <Col>
                    <h2 className="m-3">Что сделано?</h2>
                </Col>
                <Col>
                    <DatePickerDiv onSelectOptedData={onSelectOptedData} />
                </Col>
                <Col>
                    <Button variant="primary" 
                        size="sm"
                        id="AddRepairEquipment"
                        className="m-3" 
                        onClick={() => setModalShow(true)}
                        
                        >
                        Добавить работы</Button>
                </Col>
            </Row>
            

            <InsertDataModal show={modalShow} onHide={() => setModalShow(false)} />
                          
           
            
            <ReadModuleList optedData={optedData} onAddedRepair={addedRepair}/>
            
            

        </Container>
    )
};
export default InputDataSection;



function DatePickerDiv(props) {

    // todo довать возможность выбора времени (интервалы полчаса)
    // доваить выбор начал и окончания ремонта

    //Locale with time

    const year =  new Date().getFullYear();
    const month = new Date().getMonth()
    const day = new Date().getDate();

    const [valueDate, setValueDate] = useState(new Date(year, month, day));
  
    const handlerOptedData = (e) => {
        setValueDate(e);    
        props.onSelectOptedData(e);
    };

    useEffect(() => {
        props.onSelectOptedData(valueDate);
    }, []);


    return (
        <>
            <DatePicker 
                className="m-3"
                locale="ru" 
                selected={valueDate}
                onChange={(date) => handlerOptedData(date)}
                dateFormat="dd MMMM yyyy"
                startDate={valueDate}
                id='StartDateValue' />
        </>
    );
};








function InputGroupButtonSmall(props) {
    return (

        <InputGroup className="">
        <InputGroup.Checkbox 
                    aria-label="Checkbox for following text input"
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Если планируется"
                    id='CheckRepairPlan'
                    className=""
                    />
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                className=""
                data-placement="top" 
                title="Добавить запись"
                id='btnAddDescription'
                >+</Button>
        </InputGroup>


    );
};


        
      



