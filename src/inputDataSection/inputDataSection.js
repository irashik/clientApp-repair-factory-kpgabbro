import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker, { registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import { startOfDay, subDays } from "date-fns";
import * as log from 'loglevel';
import InputRepairForm from "./inputRepairForm";
import ReadModuleList from '../readModuleList';


registerLocale('ru', ru);
log.setLevel('debug');


const currentDay = startOfDay(new Date());
const startDay = subDays(currentDay, 15);

function InputDataSection(props) {
    
    const [startDate, setStartDate] = useState(startDay);
    const [endDate, setEndDate] = useState(currentDay);

    const [addedRepair, setAddedRepair] = useState([]);
    const [modalShow, setModalShow] = useState(false);

   
    function onHandleAddedRepair() {
        setAddedRepair([...addedRepair, 1]);
     };




    return (
        <Container fluid id='inputDataComponent' >
            <Row className="justify-content-md-center">
                <Col>
                    <h2 md={4} className="m-3">Выполненные работы</h2>
                </Col>
                <Col>
                    <DatePickerDivStart name="startDate" onSelectStartDate={(e) => setStartDate(e)} />
                    <DatePickerDivEnd name="endDate" onSelectEndDate={(e) => setEndDate(e)} />

                </Col>
                <Col xs={3}>
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
                                resetIdRecord={() => {return null}}
                                />
            
            <ReadModuleList startDate={startDate} endDate={endDate} onAddedRepair={addedRepair}/>
        </Container>
    )
};
export default InputDataSection;


function DatePickerDivStart(props) {

    const [valueDate, setValueDate] = useState(startDay);
  
    function handlerOptedDate(e) {
        setValueDate(e);    
        props.onSelectStartDate(e);
    };

    return (
            <DatePicker 
                className="m-3"
                locale="ru" 
                selected={valueDate}
                onChange={(date) => handlerOptedDate(date)}
                dateFormat="dd MMMM yyyy"
                id={'DateValue_start'} />
    );
};

function DatePickerDivEnd(props) {
    const [valueDate, setValueDate] = useState(currentDay);
  
    function handlerOptedDate(e) {
        setValueDate(e);    
        props.onSelectEndDate(e);
    };

    return (
            <DatePicker 
                className="m-3"
                locale="ru" 
                selected={valueDate}
                onChange={(date) => handlerOptedDate(date)}
                dateFormat="dd MMMM yyyy"
                id={'DateValue_end'} />
    );
};






        
      



