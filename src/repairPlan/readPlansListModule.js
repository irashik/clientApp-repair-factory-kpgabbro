import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import {format, parseISO } from 'date-fns';
import * as log from 'loglevel';
import { loadFromDb } from "../utils/loader";
import InputPlanRepairForm from './inputPlanRepairForm';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

log.setLevel('debug');

function ReadPlansListModule(props) {
    const [queryFromDb, setQueryFromDb] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [updatedPlan, setUpdatedPlan] = useState([]);
    const [idRecord, setIdRecord] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/repairplan");

    if (props.onSelectEquipment) {
        url.searchParams.set("equipment", props.onSelectEquipment);
    }
    if (props.onSelectStatus) {
        url.searchParams.set("status", props.onSelectStatus);
    }
    if (props.onSelectImportance) {
        url.searchParams.set("importance", props.onSelectImportance)
    }
    if (props.onSelectDescription) {
        url.searchParams.set('description', props.onSelectDescription)
    }
    if(props.onSelectTag) {
        url.searchParams.set('tag', props.onSelectTag)
    }
    if(props.onSelectPriority) {
        url.searchParams.set('priority', props.onSelectPriority);
    }
   

    function onChangeRecord(e) {
        setIdRecord(e);
    };
    function onHandleAddedPlan() {
        setUpdatedPlan([...updatedPlan, 1]);
    };

    useEffect(() => {
            loadFromDb(url)
                .then(queryFromDb => {
                    
                    setIsLoaded(true);    
                    setQueryFromDb(queryFromDb);
                })
                .catch(err => {
                    setIsLoaded(false);
                    log.debug("response server is error = " + err);
                    alert('Error from server', err);
                    //throw new Error(err);
                })
            return function cleanup() {
                setIdRecord('');
                setIsLoaded(false);
            }

    }, [props.onAddedPlan, props.onSelectStatus, props.onSelectEquipment, 
        updatedPlan, props.onSelectDescription, props.onSelectImportance, props.onSelectTag, props.onSelectPriority]);
    
        log.debug(isLoaded);

    if(!isLoaded || !queryFromDb) {
        return (
            <div>
                <h2>Нет записей</h2>
            </div>
        )
    } else {
        
        return (
            <React.Fragment>
                <InputPlanRepairForm    show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        onLoadRecord={idRecord}
                                        resetIdRecord={() => setIdRecord('')}
                                        handleAddedPlan={onHandleAddedPlan}

                />


                <Container fluid id='CardListPlanRepairs' className="d-flex flex-row flex-wrap"
                >
                    {queryFromDb.map((i) => {
                        return (
                            <ReadModuleBlock key={i._id} i={i}  
                                    onOpenRecord={() => onChangeRecord(i._id)}
                                    onModalShow={() => setModalShow(true)}
                            /> 
                            )
                        })}
                </Container>
            </React.Fragment>
        )
    }
};
export default ReadPlansListModule;



function ReadModuleBlock(props) {
    const idRecord = props.i._id;
    const curImportance = props.i.importance;
    

    function onRepairEdit() {
        props.onModalShow();
        props.onOpenRecord();
    };

    const arrayPlanRepair = props.i.description.map((a, i) => {
        return(
            <li key={i}>{a} </li> 
        )
    });
    function PriorityView(props) {
        if(props.priority) {
            return (
                <p>Приоритет: <i>{props.priority}</i></p>
            )
        } else {
            return ( null )
        }
    };
    function TagView(props) {
        if(props.tag) {
            return (
                <p>Тэг: <i>{props.tag}</i></p>
            )
        } else {
            return ( null )
        }
    };
    const statusTaskList = new Map([
        ['FINISHED', 'Завершено'],
        ['CANCELLED','Отменено'],
        ['DRAFT', 'Заготовка'],
        ['DEFERRED', 'Отложено'],
        ['INWORK', 'В работе'],
        ['ACTIVE', 'Активная']
    ]);
    const imporanceTaskList = new Map([
        ['A', 'Важно-срочно'],
        ['B', 'Важно-несрочно'],
        ['C', 'Срочно-неважно'],
        ["D", 'Несрочно-неважно']
    ])
    const importanceTaskCard = new Map([
        ['A', 'danger'],
        ['B', 'success'],
        ['C', 'warning'],
        ["D", 'secondary'],
        ['', 'light']
    ])
    const textColor = () => {
        const i = imporanceTaskList.get(curImportance);
        if (i === 'light' || i === undefined) {
            return 'dark'    
        } else { return 'white'} 
    };



     
    return (
        <Card
                bg={importanceTaskCard.get(curImportance)}
                text={textColor()}
                style={{ width: '18rem' }}
                className="mb-2 cardItem"
                id={idRecord}
                >
            <Card.Header>
                <Container fluid>
                    <Row>
                    <Col className="text-start align-middle">
                        <p id="EditPlanRepair" className="align-middle"> 
                            <i>{props.i.equipment[0].position}, {props.i.equipment[0].group}</i>


                        </p>
                    </Col>
                       <Col className="text-end">
                        
                        <Button size='sm'
                        id="editPlanRepair-btn"
                        variant="btn-secondary"
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Редактировать"

                        onClick={onRepairEdit}>
                        <TiPen />
                        </Button>
                    </Col>

                    </Row>
                    
                </Container>
                
            
            </Card.Header>
            <Card.Body>
                <Card.Title>
                    <ul>
                        {arrayPlanRepair}
                    </ul>
                </Card.Title>

                <Card.Text>
                    <Row>
                        <Col>
                            <p><i>{statusTaskList.get(props.i.status)}</i></p>
                            <TagView tag={props.i.tag} />
                        </Col>
                        <Col>
                            <p>от <i>{ format(parseISO(props.i.dateCreated), 'dd-MM-yyyy') }</i></p>    
                            <PriorityView priority={props.i.priority} />
                            
                        </Col>
                    </Row>
                    

                    
                    
                    
                    
                </Card.Text>
            </Card.Body>
        </Card>
    )
};


