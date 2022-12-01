import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import {format, parseISO } from 'date-fns';
import * as log from 'loglevel';
import { loadFromDb } from "../utils/loader";
import InputPlanRepairForm from './inputPlanRepairForm';
import Table from 'react-bootstrap/Table'

import {hashArray} from 'react-hash-string';

log.setLevel('debug');


function ReadPlansListModule(props) {
    const [listRepairPlans, setListRepairPlans] = useState([]);
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

    
    function onHandleAddedPlan() {
        setUpdatedPlan([...updatedPlan, 1]);
    };

    useEffect(() => {

            loadFromDb(url)
                .then(dbresponse => {
                    setIsLoaded(true);    
                    setListRepairPlans(dbresponse);

                })
                .catch(err => {
                    log.debug("response server is error = " + err);
                    alert('Error from server', err);

                })
             return function cleanup() {
                 setIdRecord('');
             }

    }, [    props.onAddedPlan, 
            updatedPlan, 

            props.onSelectStatus,
            props.onSelectEquipment, 
            props.onSelectDescription, 
            props.onSelectImportance, 
            props.onSelectTag, 
            props.onSelectPriority
        ]);
 

    if(!isLoaded || !listRepairPlans) {
        return <div><h2>Нет записей</h2></div>
    } else {
        
        return (

            <React.Fragment>
                <InputPlanRepairForm    show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        onLoadRecord={idRecord}
                                        resetIdRecord={() => setIdRecord('')}
                                        handleAddedPlan={onHandleAddedPlan}

                />

                <Table id='tablePlanRepairs' responsive='md' bordered hover>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th className="col-lg-2" id='colPlan'>Плановые работы</th>
                            <th>Оборудование</th>
                            <th>Дата создания</th>
                            <th className="col-2">Тэг</th>
                            <th className="col-2">Приоритет</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRepairPlans.map((i) => {

                            return (
                                <ReadModuleBlock    key={i._id} i={i}  
                                                    onOpenRecord={() => setIdRecord(i._id)}
                                                    onModalShow={() => setModalShow(true)}
                                /> 
                                )
                            })}
                    </tbody>
                </Table>


                
            </React.Fragment>
        )
    }
};
export default ReadPlansListModule;





function ReadModuleBlock(props) {
        
    let {onOpenRecord, onModalShow, ...customProps} = props;
    
    const idRecord = customProps.i._id;
    const curImportance = customProps.i.importance;
    const stringId = new String(idRecord);
    const sliceStringId = stringId.slice(-5);

    function onRepairEdit() {
        props.onModalShow();
        props.onOpenRecord();
    };
    function ListPlanRepairs(props) {
        let list = null;
        if(props.description) {
            list = props.description.map((a, i) => {
                return <li key={i}>{a}</li> //todo по документации ключ не нужен, но ошибку выдает в браузере
            });
            return ( 
                <ul>{list}</ul>
            )
        } else { return <ul></ul> }
    };
    function PriorityView(props) {
        if(props.priority) {
            return (
                <React.Fragment>
                    <i>{props.priority}</i>
                </React.Fragment>
            )
        } else {
            return ( null )
        }
    };
    function TagView(props) {
        if(props.tag) {
            return (
                <React.Fragment>
                    <i>{props.tag}</i>
                </React.Fragment>
                
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
        ['B', 'primary'],
        ['C', 'warning'],
        ["D", 'secondary'],
        ['', 'light']
    ])
    const textColor = () => {
        const i = 'table-' + importanceTaskCard.get(curImportance);
        return i;
         
    };
    const myKey = hashArray(customProps.i.description);

    return (
        <tr id={idRecord} className={textColor()}>
            <td>
                <Button variant="outline-dark" data-toggle="tooltip" size="sm"
                        data-placement="top" title={sliceStringId}
                        id='editPlanRepair-btn'
                        onClick={onRepairEdit}>
                            <TiPen />
                </Button>
                {sliceStringId}
            </td>
            <td>
                <ListPlanRepairs key={myKey} description={customProps.i.description}/>
            </td>
            <td>
                <i>{customProps.i.equipment[0].position}, {customProps.i.equipment[0].group}</i>
            </td>
            <td>
                <i>{format(parseISO(customProps.i.dateCreated), 'dd-MM-yyyy') }</i>
            </td>
            <td>
                <TagView tag={customProps.i.tag}/>
            </td>
            <td>
                <PriorityView priority={customProps.i.priority}/>
            </td>         
        </tr>
    )
};
