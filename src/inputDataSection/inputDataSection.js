// страница ввода данных о ремонте.

import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);
import * as log from 'loglevel';
log.setLevel('debug');

import InputRepairForm from "./inputRepairForm";
import ReadModuleList from '../readModuleList';



function InputDataSection(props) {

    const year =  new Date().getFullYear();
    const month = new Date().getMonth()
    const day = new Date().getDate();

    const [optedData, setOptedData] = useState(new Date(year, month, day));
    const [addedRepair, setAddedRepair] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    
    // если нет в лок хранилище или срок использованиея..
    // проверка что вернуля не null? обработка ошибок?
    // await getUnitEquipmentList();
    //console.log('localstorage.setitem' + this.state.resultKeyListEquipment);
    //localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
   



    function onSelectOptedData(selectedDate) {
        setOptedData(selectedDate);
        log.info(selectedDate);
    };

    function onHandleAddedRepair() {
        setAddedRepair([...addedRepair, 1]);
 
    };




    return (
        <Container fluid >
            <Row className="justify-content-md-center">
                <Col>
                    <h2 className="m-3">Что сегодня сделано?</h2>
                </Col>
                <Col>
                    <DatePickerDiv onSelectOptedData={onSelectOptedData} />
                </Col>
                <Col>
                    <Button variant="primary" 
                        id="AddRepairEquipment"
                        className="m-3" 
                        onClick={() => setModalShow(true)}
                        
                        >Добавить работы
                    </Button>
                </Col>
            </Row>

            <InputRepairForm    show={modalShow} 
                                onHide={() => setModalShow(false)}
                                handleAddedRepair={onHandleAddedRepair}
                                
                                />
            
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
  

    function handlerOptedData(e) {
        setValueDate(e);    
        props.onSelectOptedData(e);
    };


    return (
            <DatePicker 
                className="m-3"
                locale="ru" 
                selected={valueDate}
                onChange={(date) => handlerOptedData(date)}
                dateFormat="dd MMMM yyyy"
                startDate={valueDate}
                id='StartDateValue' />
    );
};







        
      



