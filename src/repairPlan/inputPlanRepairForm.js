
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import { useDebouncedCallback } from 'use-debounce';
import * as log from 'loglevel';




import SearchList from "../searchListUnitEquipment";
import { unloadInDb } from "../utils/loader";

log.setLevel('debug');


function InputPlanRepairForm(props) {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');


    const [repairCount, setRepairCount] = useState([]);
    const [spendingJob, setSpendingJob] = useState(0);
    const [statusState, setStatusState] = useState('DRAFT');
    const [priority, setPriority] = useState('');
    const [comment, setComment] = useState('');
    const [repair, setRepair] = useState([]);



    const delay = 1000;
    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        delay
    );

    const onChangeSearch = (e) => {
        const { value } = e.target
        setSearchString(value);
        debouncedSetFilter(value);
        setIdEquipment(null);

    };


    const handlerSelectEquipment = (id, joinNameUnit, e) => {
        setSearchString(joinNameUnit);
        setIdEquipment(id);
    };

    function onClickAddedPlan() {
        const dateCreated = new Date();
        let data = {
            dateCreated: dateCreated,
            //dateFinished:
            equipment: idEquipment,
            author: localStorage.getItem('userId'),
            description: repair,
            status: statusState,
            comment: comment,
            spendingJob: spendingJob,
            priority: priority
        }
       
        log.debug('data= ' + JSON.stringify(data));

        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/repairplan";


        unloadInDb(url, data)
            .then(result => {
                             
                setSearchString('');
                setIdEquipment('');
                setSpendingJob('');
                setStatusState('DRAFT');
                setPriority('');
                setComment('');
                setRepair([]);

                //todo toast message add ?
                props.onHide();
                props.handleAddedPlan();

            })
            .catch(err => {

                alert('catch= ' + JSON.stringify(err));
                
            })


    };
    

    function onHandleRepairCount() {
        setRepairCount([...repairCount, 1]);
    }

    function onRecordRepair(record) {
        setRepair(record);
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
                            <FormInputRepair count={repairCount} onHandleRecordRepair={onRecordRepair}/>
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall onHandleRepairCount={onHandleRepairCount} />
                        </Col>
                    </Row>

              
                    <Row>
                        <label>Статус задачи</label>
                        <Form.Control as='select' size="sm" aria-label="Выберите статус задачи"
                                    value={statusState}
                                    onChange={(e) => setStatusState(e.target.value)}>
                                <option value="DRAFT">Черновик</option>
                                <option value="CANCELLED">Отменено</option>
                                <option value="FINISHED">Завершено</option>
                                <option value="DEFERRED">Отложено</option>
                                <option value="INWORK">В работе</option>
                                <option value="ACTIVE">Активная</option>
                            </Form.Control>
                    </Row>
                    <Row>
                        <Form.Control 
                                    id='inputPriority' size="sm" type="text" 
                                    placeholder="Приоритетность задачи"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    />
                    </Row>
                    <Row>
                        <Form.Control id='inputComment' size="sm" as="textarea" rows={3} 
                                        placeholder="Комментарии"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        />
                    </Row>
                    <Row>
                        <label>Трудозатраты</label>
                        <Form.Control 
                                id='inputSpendingJob' size="sm" pattern="[0-9]*" 
                                type="number" 
                                placeholder="трудозатраты"
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
                            onClick={() => onClickAddedPlan()}
                        >Записать
                </Button>
            </Modal.Footer>
        </Modal>        
    )
};
export default InputPlanRepairForm;




function InputGroupButtonSmall(props) {
       
    function  onAddedRecord() {
        props.onHandleRepairCount();
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
    const [repair, setRepair] = useState([]);

    function handleRecordRepair(e, i) {
        let cloneRepair = [...repair];
        cloneRepair[i] = e;
        setRepair(cloneRepair);
        props.onHandleRecordRepair(repair);
    }

    useEffect(() => {
        setCount([...count, 1])
        }, [props.count])

    function result(i) {
        return(
            <Form.Control id='inputRepairDescription' 
            as='textarea' 
            key = {i}
            size="sm" rows={4} 
            placeholder="Что требуется сделать?"
            value={repair[i]}
            onChange={(e) => handleRecordRepair(e.target.value, i)}
            />
        )
    }

    let arrayList = count.map((a, i) => result(i))
    return arrayList;
};
