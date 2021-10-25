// форма (модальное окно) для ввода данных о ремонте.


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

import Toast from 'react-bootstrap/Toast'


registerLocale('ru', ru);

import SearchList from "../searchListUnitEquipment";
import * as log from 'loglevel';
import { unloadInDb } from "../utils/loader";
log.setLevel('debug');


function InputRepairForm(props) {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');

    const [repairCount, setRepairCount] = useState([]);
    const [materialCount, setMaterialCount] = useState([]);

    const [dataStart, setDataStart] = useState('');
    const [dataEnd, setDataEnd] = useState('');

    const [spendingJob, setSpendingJob] = useState('');

    let [repair, setRepair] = useState([]);
    let [material, setMaterial] = useState([]);
    let [value, setValue] = useState([]);



    const delay = 500;
    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        delay
    );

    const onChangeSearch = (e) => {
        const { value } = e.target;
        setSearchString(value);
        debouncedSetFilter(value);
        setIdEquipment(null)
    };
    
    const handlerSelectEquipment = (id, joinNameUnit, e) => {
        setSearchString(joinNameUnit);
        setIdEquipment(id);
    };

    function onClickAddedRepair() {


        // собрать данные из полей

        let materialJoin = material.map((i, a) => {
            let t = { name: i, value: value[a]};
            return t;
        });

        // подготовить данные для отправки на сервер
        const data = {
            dateRepairStart: dataStart,
            dateRepairEnd: dataEnd,
            equipment: idEquipment,
            repair: repair,
            author: localStorage.getItem('userId'),
            material: materialJoin,
            spendingJob: spendingJob
        };
        // записать в базу
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment";

        unloadInDb(url, data)
            .then(result => {

                // все хорошо, сказать ок. и закрыть окно.
                // очистить поля остальные сами очищаются
                setSearchString('');
                setIdEquipment('');
                setSpendingJob('');

                // закрыть модальное окно.
                props.onHide();
                props.handleAddedRepair(); // для обновление списка ремонтов. 
                

                })
                .catch(err => {
                    alert('catch==' + JSON.stringify(err));
                    return new Error(err);
                });
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
    function OnRecordRepair(record) {
        setRepair(record);
    }
    function OnRecordMaterial(record) {
        setMaterial(record);
    }
    function OnRecordValue(record) {
        setValue(record);
    };

      
    return   (    
        <Modal {...props} 
            backdrop="static"
            dialogClassName='modal-fullscreen'
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма ввода данных о работах
                </Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={props.onHide}

                ></button>
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
                            <FormInputRepair count={repairCount} onHandleRepair={OnRecordRepair}/>
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall name="equipment" onHandleRepairCount={onHandleRepairCount} />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <FormInputMaterial count={materialCount} onHandleMaterial={OnRecordMaterial} onHandleMaterialVal={OnRecordValue}/>
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall name="material" onHandleMaterialCount={onHandleMaterialCount} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Control id='inputSpendingJob' size="sm" type="text" 
                                        placeholder="Трудозатраты"
                                        value={spendingJob}
                                        onChange={(e) => setSpendingJob(e.target.value)}
                                        />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                            id="AddRepairEquipment"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickAddedRepair()}
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
    const [count, setCount] = useState([]);
    const [repair, setRepair] = useState([]);


    function onHandleRepair(e, i) {
        let cloneRepair = [...repair];
        cloneRepair[i] = e;
        setRepair(cloneRepair);
        props.onHandleRepair(repair);
    }


    useEffect(() => {
        setCount([...count, 1])
        }, [props.count])


    function result(i) {
        return(
            <Form.Control id='inputRepairDescription' as='textarea' size="sm" rows={3} 
                placeholder="Что сделано?"
                key={i} 
                value={repair[i]}
                onChange={(e) => onHandleRepair(e.target.value, i)}
                />
        )
    }
    let arrayList = count.map((a,i) => result(i));
    return arrayList;
};

function FormInputMaterial(props) {

    const [count, setCount] = useState([]);
    const [material, setMaterial] = useState([]);
    const [value, setValue] = useState([]);



    function onHandleMaterial(e, i) {
        let cloneMaterial = [...material];
        cloneMaterial[i] = e
        setMaterial(cloneMaterial);
        props.onHandleMaterial(material);

   }

    function onHandleMaterialVal(e, i) {
        let cloneValue = [...value];
        cloneValue[i] = e;
        setValue(cloneValue);
        props.onHandleMaterialVal(value);
        
    }


    useEffect(() => {
        setCount([...count, 1]);
        
    }, [props.count])

    function result(i) {
        return (
            <Row key={'inputMaterial-'+i}>
                <Col>
                    <Form.Control id={'inputMaterialName-'+i} size="sm" type="text" 
                    placeholder="Введите материал"
                    key={i+'name'}
                    value={material[i]}
                    onChange={(e) => onHandleMaterial(e.target.value, i)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control id={'inputMaterialVal-'+i}  size="sm" type="text"  
                    placeholder="Введите его количество"
                    key={i+'val'}
                    value={value[i]}
                    onChange={(e) => onHandleMaterialVal(e.target.value, i)}
                    />
                </Col>
            </Row>
            )
        };

    let arrayList = count.map((a, i) => result(i));
    return arrayList;


};

