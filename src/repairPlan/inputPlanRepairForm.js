
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
import {format, parseISO } from 'date-fns';





import SearchList from "../searchListUnitEquipment";
import { loadFromDb, unloadInDb, unloadInDbPatch } from "../utils/loader";

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
    const [idRecord, setIdRecord] = useState([]);
    const [dateCreated, setDateCreated] = useState('');
    const [dateFinished, setDateFinished] = useState('');
    const [author, setAuthor] = useState('');
    const [sourceRepair, setSourceRepair] = useState([]);


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

    function onClickUpdatePlan() {

        const dateFinished = new Date();
        let data = {
            dateFinished: dateFinished,
            equipment: idEquipment,
            description: repair,
            status: statusState,
            comment: comment,
            spendingJob: spendingJob,
            priority: priority
        }
       
        log.debug('data= ' + JSON.stringify(data));
        log.info('idRecord=', idRecord);

        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/repairplan/" + idRecord;

        unloadInDbPatch(url, data)
            .then(result => {
                try{
                    setSearchString('');
                    setIdEquipment('');
                    setSpendingJob('');
                    setStatusState('DRAFT');
                    setPriority('');
                    setComment('');
                    setRepair([]);
                    setSourceRepair([]);
    
                    //todo toast message add ?
                    props.handleAddedPlan();
                    props.onHide();
    
                }
                catch(e) {
                    log.debug('error', e);
                }


            })
            .catch(err => {
                throw new Error('какая-то ошибка', err);
            })
    };

    function onHandleRepairCount() {
        setRepairCount([...repairCount, 1]);
    }

    function onRecordRepair(record) {
        setRepair(record);
    }

    const { handleAddedPlan, onLoadRecord, resetIdRecord, ...modal} = props; // исключаю пропсы функции

    
    

    useEffect(() => {
        if(props.onLoadRecord) {
            let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                     "/repairplan/" + props.onLoadRecord);

            loadFromDb(url)
                .then(result => {
                    setIdRecord(result._id);
                    setIdEquipment(result.equipment);
                    setSpendingJob(result.spendingJob);
                    setSourceRepair(result.description);
                    setStatusState(result.status);
                    setComment(result.comment);
                    setDateCreated(result.dateCreated);
                    setDateFinished(result.dateFinished);
                    setPriority(result.priority);
                    setAuthor(result.author);
                    
    
    
                    // idEquipment есть нужна строка.
                    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + 
                            "/unit-equipment" + "/" + result.equipment);
                    loadFromDb(url).then(result => {
                        let fullName = result.position + " " + result.group;
                        setSearchString(fullName);
                        // а как же отслеживание состояние - будет тогда еще один запрос.
                       //todo этот код похоже ненадежный, но он работает. )
                    })
                    .catch(e => {
                        throw new Error(e);
                    })
                })
                .catch(e => {
                    log.debug('error =' + e);
                })
        }
    
        return function cleanup() {
            props.resetIdRecord(); // сбросить id после выполнения.

            setIdRecord('');
            setIdEquipment('');
            setSpendingJob(0);
            setRepair('');
            setStatusState('DRAFT');
            setComment('');
            setDateCreated('');
            setPriority('');
            setAuthor('')
            setDateFinished('');

            setSearchString('')
            setRepairCount('');
            setFilter('');

            setSourceRepair([]);

        }

    }, [props.onLoadRecord]);
    
    
    function DateCreatedView(modal) {
        if(modal.dateCreated) {
            return (
                <p>Дата создания записи: {format(parseISO(modal.dateCreated), 'dd-MM-yyyy') }</p>
            )
        } else { 
            return (null) }
    };

    function DateFinishedView(modal) {
        if(modal.dateFinished) {
            return (
                <p>Дата изменения статуса: {format(parseISO(modal.dateFinished), 'dd-MM-yyyy HH:mm')}</p>
            )
        } else { return(null) }
    };

    function AuthorView(modal) {
        if(modal.author) {
            return (
        <p>Автор записи: {modal.author}</p>
            )
        } else { return(null) }
    };

    function BtnView(props) {
        // todo тут просто через пропы передается id author т.к. он появляется при редактировании.
        
        if(props.onLoadRecord) {
            return (
                <Button variant="primary"    
                            id="UpdatePlanbtn"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickUpdatePlan()}
                        >Обновить
                </Button>
            ) ;
        } else {
            return (
                <Button variant="primary"    
                            id="CreatePlanbtn"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickAddedPlan()}
                        >Создать
                </Button>
            );
        }
    }


    return(    
        <Modal {...modal} 
            backdrop="static"
            dialogClassName='modal-fullscreen'
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            key={idRecord}
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
                                    title={idEquipment}
                                    />
                            <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
                            <br></br>
                        </Col>
                        <Col md={6}>
                            <FormInputRepair count={repairCount} onHandleRecordRepair={onRecordRepair} onLoadRepair={sourceRepair}/>
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
                    <Row>
                        <DateCreatedView dateCreated={dateCreated}/>
                        <DateFinishedView dateFinished={dateFinished} />
                        <AuthorView author={author} />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <BtnView onLoadRecord={author} />


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
    const [count, setCount] = useState([1]);
    const [repair, setRepair] = useState([]);

    function handleRecordRepair(e, i) {
        let cloneRepair = [...repair];
        cloneRepair[i] = e;
        setRepair(cloneRepair);

        props.onHandleRecordRepair(cloneRepair);
    }

    useEffect(() => {
        setCount([...count, 1])

        return function cleanup() {
            setCount([]);
        }

    }, [props.count]);

    useEffect(() => {
        if(props.onLoadRepair.length) {
            let item = props.onLoadRepair.length;
            let itemAr = new Array(item);
            let newCount = count.concat(itemAr);
            
            setRepair(props.onLoadRepair);
            setCount(newCount);
        }

        return function cleanup() {
            setCount([]);
            setRepair([]);
        }

    }, [props.onLoadRepair])
    
    let arrayList = count.map((a, i) => Result(i));
    return arrayList;

    function Result(i) {
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
    };
    
};



