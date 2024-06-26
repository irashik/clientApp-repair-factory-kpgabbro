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
    const [repairCount, setRepairCount] = useState([1]);
    const [repair, setRepair] = useState([]);
    const [sourceRepair, setSourceRepair] = useState([]);
    const [spendingJob, setSpendingJob] = useState(0);
    const [statusState, setStatusState] = useState('ACTIVE');
    const [priority, setPriority] = useState('');
    const [importance, setImportance] = useState('');
    const [comment, setComment] = useState('');
    const [idRecord, setIdRecord] = useState([]);
    const [dateCreated, setDateCreated] = useState('');
    const [dateFinished, setDateFinished] = useState('');
    const [author, setAuthor] = useState('');
    const [idAuthor, setIdAuthor] = useState('');
    const [tag, setTag] = useState('');
    
    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        process.env.DEBOUNCEDDELAY
    );
    function onChangeSearch(e) {
        const a = e.target.value.toString();
        setSearchString(a);
        debouncedSetFilter(a);
        setIdEquipment(null);
    };
    function handlerSelectEquipment(id, joinNameUnit) {
        setSearchString(joinNameUnit);
        setIdEquipment(id);
    };
    function onClickAddedPlan() {
        
        let data = {
            dateCreated: new Date(),
            equipment: idEquipment,
            author: localStorage.getItem('userId'),
            description: repair,
            status: statusState,
            comment: comment,
            spendingJob: spendingJob,
            priority: priority,
            importance,
            tag

        }
       
        const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/repairplan");

        unloadInDb(url, data)
            .then(result => {
                setSearchString('');
                setIdEquipment('');
                setSpendingJob('');
                setStatusState('ACTIVE');
                setPriority('');
                setComment('');
                setRepair([]);
                setAuthor('');
                setIdAuthor('');
                setFilter('');
                setTag('');


                //todo toast message add ?
                props.onHide();
                props.handleAddedPlan();
            })
            .catch(err => {
                alert('catch= ' + JSON.stringify(err));
            })
    };
    function onClickUpdatePlan() {
       
        let data = {
            dateFinished: new Date(),
            equipment: idEquipment,
            description: repair,
            status: statusState,
            comment: comment,
            spendingJob: spendingJob,
            priority: priority,
            importance,
            tag
        }
              

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
                    setRepairCount([1]);
                    setAuthor('');
                    setIdAuthor('');
                    setFilter('');
                    setImportance('');
                    setIdRecord('');
                    setTag('');
    
                    //todo toast message add ?
                    props.onHide();
                    props.handleAddedPlan();
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

    const { handleAddedPlan, onLoadRecord, resetIdRecord, ...modal} = props; // исключаю пропсы-функции
   
    

    useEffect(() => {
        if(props.onLoadRecord) {
            let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                     "/repairplan/" + props.onLoadRecord);

            loadFromDb(url)
                .then(result => {
                    setIdRecord(result._id);
                    setIdEquipment(result.equipment[0]._id);
                    setSpendingJob(result.spendingJob);
                    
                    setSourceRepair(result.description);
                    const newRepairCount = new Array(result.description.length);
                    setRepairCount(newRepairCount);

                    setStatusState(result.status);
                    setComment(result.comment);
                    setDateCreated(result.dateCreated);
                    setDateFinished(result.dateFinished);
                    setPriority(result.priority);
                    setImportance(result.importance);
                    setAuthor(result.author[0].name);
                    setIdAuthor(result.author[0]._id);
                    setTag(result.tag);
    
                    // idEquipment есть нужна строка.
                    const reqUnitUrl = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + 
                            "/unit-equipment" + "/" + result.equipment[0]._id);
                           
                    loadFromDb(reqUnitUrl).then(res => {
                        let fullName = res.position + " " + res.group;
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
                if(props.onLoadRecord) {
                    props.resetIdRecord(); // сбросить id после выполнения.
                }
                setIdRecord('');
                setIdEquipment('');
                setSpendingJob(0);
                setRepair('');
                setStatusState('DRAFT');
                setComment('');
                setDateCreated('');
                setPriority('');
                setAuthor('');
                setIdAuthor('');
                setDateFinished('');
                setSearchString('')
                setRepairCount([1]);
                setFilter('');
                setSourceRepair([]);
                setImportance('');
                setTag('');

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
    function BtnView(modal) {
        // todo тут просто через пропы передается id author т.к. он появляется при редактировании.
        
        if(modal.onLoadRecord.length) {
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
                            disabled={!idEquipment}
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickAddedPlan()}
                        >Создать
                </Button>
            );
        }
    };
    function onHandleNumberInput(event) {
        if (!/\d/.test(String.fromCharCode(event.charCode)) &&
            event.charCode > 9 &&
            !event.ctrlKey){  //event.ctrlKey не срабатывает.
                event.preventDefault();
        }
    }

    function modalClose() {
        if(props.onLoadRecord) {
            props.resetIdRecord(); // сбросить id после выполнения.    
        }
            props.onHide();
            setIdRecord('');
            setIdEquipment('');
            setSpendingJob(0);
            setRepair('');
            setStatusState('DRAFT');
            setComment('');
            setDateCreated('');
            setPriority('');
            setAuthor('');
            setIdAuthor('');
            setDateFinished('');
            setSearchString('')
            setRepairCount([1]);
            setFilter('');
            setSourceRepair([]);
    };



    return(    
        <Modal {...modal} 
            backdrop="static"
            dialogClassName='modal-90w'
            size='lg'
            fullscreen="lg-down"
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            key={idRecord}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма ввода данных о плановых работах
                </Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalClose}></button>
                
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container fluid id='input-module'>
                    <Row>
                        <Col md='auto'>
                            <Form.Control 
                                    id='inputEquipment' size="sm" type="text" 
                                    placeholder="Выберите оборудование"
                                    value={searchString}
                                    onChange={onChangeSearch}
                                    title={idEquipment}
                                    />
                            <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
                            <br></br>
                            <label>Трудозатраты</label>
                        <Form.Control 
                                id='inputSpendingJob' size="sm" pattern="[0-9]*" 
                                type="number" 
                                placeholder="трудозатраты"
                                onChange={(e)=> setSpendingJob(e.target.value)}
                                value={spendingJob}
                                onKeyPress={(event) => onHandleNumberInput(event)}
                                />
                                

                        </Col>
                        <Col md={8}>
                            <FormInputRepair    count={repairCount} onHandleRecordRepair={onRecordRepair} 
                                                onLoadRepair={sourceRepair}/>
                        </Col>
                        {/* <Col md={2}>
                            <InputGroupButtonSmall onHandleRepairCount={onHandleRepairCount} />
                        </Col> */}
                    </Row>
                    <Row>
                        <label>Статус задачи</label>
                        <Form.Control as='select' size="sm" aria-label="Выберите статус задачи"
                                    value={statusState}
                                    onChange={(e) => setStatusState(e.target.value)}>

                                <option value="DRAFT">Заготовка</option>
                                <option value="CANCELLED">Отменено</option>
                                <option value="FINISHED">Завершено</option>
                                <option value="DEFERRED">Отложено</option>
                                <option value="INWORK">В работе</option>
                                <option value="ACTIVE">Активная</option>
                                
                            </Form.Control>
                    </Row>
                    <Row>
                        <Form.Control 
                                    id='inputTag' size="sm" type="text" 
                                    placeholder="Тэг"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    />
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
                        <label>Важность задачи</label>
                        <Form.Control 
                                id='inputImportance'
                                as='select' size="sm" aria-label="Выберите важность задачи"
                                value={importance}
                                onChange={(e) => setImportance(e.target.value)}>

                            <option value=''> -- select an option -- </option>
                            <option value="A">Важно-срочно</option>
                            <option value="B">Важно-несрочно</option>
                            <option value="C">Срочно-неважно</option>
                            <option value="D">Несрочно-неважно</option>
                            </Form.Control>
                     
                    </Row>
                    <Row>
                        <Form.Control id='inputComment' size="sm" as="textarea" rows={3} 
                                        placeholder="Комментарии"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        />
                    </Row>
                    <Row>
                        
                    </Row>
                    <Row>
                        <DateCreatedView dateCreated={dateCreated}/>
                        <DateFinishedView dateFinished={dateFinished} />
                        <AuthorView author={author} />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <BtnView onLoadRecord={idRecord} />
            </Modal.Footer>
        </Modal>        
    )
};
export default InputPlanRepairForm;



// todo исключил посклюку безсполезно. Сделай обратную совместимость, чтобы массив склеивался в одно поле.
function InputGroupButtonSmall(props) {
     
    
    return (
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                className=""
                data-placement="top" 
                title="Добавить запись"
                id='btnAddDescription'
                onClick={() => props.onHandleRepairCount()}
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
            setRepair(props.onLoadRepair);
            const newCount = new Array(props.onLoadRepair.length);
            setCount(newCount);
            props.onHandleRecordRepair(props.onLoadRepair);
        }

        return function cleanup() {
            setCount([]);
            setRepair([]);
        }

    }, [props.onLoadRepair])
    

    const arrayList = count.map((a, i) => {
        return result(i);
    });

    function result(i) {
        return(
            <Form.Control id={'inputPlanDescription_' + i} 
            as='textarea' size="sm" rows={4} 
            placeholder="Что требуется сделать?"
            key = {i}
            value={repair[i]}
            onChange={(e) => handleRecordRepair(e.target.value, i)}
            />
        )
    };

    return (
        <React.Fragment>
            { arrayList }
        </React.Fragment>
    )
};



