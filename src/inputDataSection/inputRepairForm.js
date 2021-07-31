

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
import ModalHeader from 'react-bootstrap/ModalHeader';
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





function InputRepairForm(props) {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');


    const [repairCount, setRepairCount] = useState([]);
    const [materialCount, setMaterialCount] = useState([]);

    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');



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
    

    function onHandleRepairCount() {
        setRepairCount([...repairCount, 1]);

    }

    function onHandleMaterialCount() {
        setMaterialCount([...materialCount, 1]);
    }


    const onSelectOptedDataStart = (selectedDate) => {
        setDataStart(selectedDate);
    }

    const onSelectOptedDataEnd = (selectedDate) => {
        setDataEnd(selectedDate);
    }






    return   (    


        <Modal {...props} 
            backdrop="static"
            dialogClassName='modal-fullscreen'
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма ввода данных о ремонте
                </Modal.Title>


            </Modal.Header>


            <Modal.Body className="show-grid">


                <Container fluid id='input-module'>

                    <Row>
                        
                        <Col>
                        <label>Время начало ремонта
                            <DatePickerDiv onSelectOptedData={onSelectOptedDataStart} />
                        </label>
                        
                        </Col>

                        <Col>
                        <label>Время окончания ремонта
                            <DatePickerDiv onSelectOptedData={onSelectOptedDataEnd} />
                        </label>

                        
                        </Col>

                    </Row>


                    <Row>
                        <Col >
                            <Form.Control 
                                    id='inputEquipment' size="sm" type="text" 
                                    placeholder="Выберите оборудование"
                                    value={searchString}
                                    onChange={onChangeSearch}
                                    idunit={idEquipment}

                                    />
                            
                            <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />

                        </Col>
                    
                        <Col md={6}>

                            <FormInputRepair count={repairCount} />


                        </Col>

                        <Col md={2}>
                            <InputGroupButtonSmall name="equipment" onHandleRepairCount={onHandleRepairCount} />
                        </Col>
                    </Row>

                    <Row>
                        <Col >
                            <FormInputMaterial count={materialCount} />
                        </Col>
                        


                        <Col md={2}>
                            <InputGroupButtonSmall name="material" onHandleMaterialCount={onHandleMaterialCount} />
                        </Col>
                    </Row>
                    
           
                </Container>
      
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" 
                            id="AddRepairEquipment"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickAddedRepair}

                            
                            >
                    Записать
                </Button>

            </Modal.Footer>
        </Modal>        





       
    
    )
    
};
export default InputRepairForm;




function InputGroupButtonSmall(props) {

    let onAddedRecord = null;

    if(props.name === "equipment") {
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

function DatePickerDiv(props) {

    // todo довать возможность выбора времени (интервалы полчаса)
    // доваить выбор начал и окончания ремонта

    //Locale with time

    const year =  new Date().getFullYear();
    const month = new Date().getMonth()
    const day = new Date().getDate();
    const hours = new Date().getHours();

    const [valueDate, setValueDate] = useState(new Date(year, month, day, hours));


  
    const handlerOptedData = (e) => {
        setValueDate(e);    
        props.onSelectOptedData(e);

    };

    useEffect(() => {
        props.onSelectOptedData(valueDate);
    }, []);

    if(props.type === 'dateStart') {

    }

    if(props.type === 'dateEnd') {

    }




    return (
        <React.Fragment>
            <DatePicker 
                            className="m-3"
                            locale="ru" 
                            selected={valueDate}
                            onChange={(date) => handlerOptedData(date)}
                            locale="ru"
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={30}
                            dateFormat="dd MMMM yyyy HH:mm"
                            startDate={valueDate}
                            id='StartDateValue' />
        </React.Fragment>
    );
};

function FormInputRepair(props) {
    const [count, setCount] = useState(props.count);



    useEffect(() => {
        setCount([...count, 1])
        }, [props.count])



    let arrayList = count.map(i => {
        return(
                
                    <Form.Control id='inputRepairDescription' key={i} as='textarea' size="sm" rows={3} placeholder="Что сделано?"  />
                
        )
    })
    return arrayList;
};

function FormInputMaterial(props) {
    const [count, setCount] = useState(props.count);

    useEffect(() => {
        setCount([...count, 1]);
    }, [props.count])
    
    let arrayList = count.map(i => {
        return (
            
            <Row>
                <Col>
                    <Form.Control id='inputMaterial' key={i} size="sm" type="text" placeholder="Введите материал"  />
                </Col>
                <Col md={3}>
                    <Form.Control id='inputMaterial' key={i} size="sm" type="text"  placeholder="Введите его количество"  />
                </Col>
            </Row>
            
            )
    })
     
    return arrayList;


};