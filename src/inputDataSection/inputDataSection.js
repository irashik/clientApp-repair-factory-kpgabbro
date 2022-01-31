import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker, { registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import * as log from 'loglevel';
import InputRepairForm from "./inputRepairForm";
import ReadModuleList from '../readModuleList';


registerLocale('ru', ru);
log.setLevel('debug');



function InputDataSection(props) {

    const year =  new Date().getFullYear();
    const month = new Date().getMonth()
    const day = new Date().getDate();

    const [optedData, setOptedData] = useState(new Date(year, month, day));
    const [addedRepair, setAddedRepair] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    function onSelectOptedData(selectedDate) {
        setOptedData(selectedDate);
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
                                resetIdRecord={() => {return null}}
                                />
            
            <ReadModuleList optedData={optedData} onAddedRepair={addedRepair}/>
        </Container>
    )
};
export default InputDataSection;


function DatePickerDiv(props) {

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
                //startDate={valueDate}
                id='StartDateValue' />
    );
};







        
      



