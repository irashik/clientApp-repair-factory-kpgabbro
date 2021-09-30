/* 
    модуль для загрузки списка записей о плановых работах! 
*/

import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

import ru from 'date-fns/locale/ru';
import {format, parseISO, formatISO, endOfDay, startOfDay } from 'date-fns';

//import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
//registerLocale('ru', ru);

import * as log from 'loglevel';
log.setLevel('debug');





function ReadPlansListModule(props) {

    const [queryFromDb, setQueryFromDb] = useState([]);
    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/repairplan");
    log.info('ReadPlansListModule props == ' + JSON.stringify(props));


    if ( _.isObject(props.onSelectEquipment)) {
        url.searchParams.set("equipment", props.onSelectEquipment);
    }

    if ( _.isObject(props.onSelectStatus)) {
        url.searchParams.set("status", props.onSelectStatus);
    }

    useEffect(() => {
            fetchListFromDb(url).then(queryFromDb => {
                    setQueryFromDb(queryFromDb);
            });

    }, [props.onAddedPlan, props.onSelectStatus, props.onSelectEquipment]);
    

    if(!queryFromDb.length) {
        return (
            <div>
                <h2>Нет записей</h2>
            </div>
        )
    } else {
        return (
            <Table id='tablePlansRepair' responsive='mg' bordered hover>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th id='colPlan'>Плановые работы</th>
                        <th id='colPlan'>Материалы {"{Наимен.; Кол-во; Описание}"}</th>
                        <th>Примечание</th>
                        <th>Оборудование</th>
                        <th>Статус</th>
                        <th>Трудозатраты</th>
                        <th>Приоритет</th>
                        <th>Автор</th>
                        <th>Дата создания</th>
                        <th>Дата завершения</th>
                    </tr>
                </thead>
                <tbody>
                    {   queryFromDb.map((i) => {
                            return (
                                <ReadModuleBlock key={i._id} i={i} /> 
                    
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }
};
export default ReadPlansListModule;



function ReadModuleBlock(props) {


    const idRecord = props.i._id;
    
    const onRepairEdit = (e) => {
        // открыть модальное окно
        // взять id 
        // в модальное нужно загрузить данные по id

        console.log(idRecord);


    };

    const arrayPlanRepair = props.i.description.map((a, i) => {
        return(
            <li key={i}>{a} </li> 
        )
    });
    const arrayPlanMaterial = props.i.materialPlan.map((i, a) => {
        return (
            
                <ul key={a}>
                    <li>
                        {i.nameMaterial} <strong>;&nbsp;&nbsp; </strong> 
                        {i.valueMaterial} <strong>;&nbsp;&nbsp; </strong> 
                        {i.descriptionMaterial}
                    </li>
                </ul>
            
        );
    });


   
    
    
    return (
        <tr key={idRecord}>
            <td>
                <Button variant="outline-dark" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Редактировать"
                        id='EditPlanRepair'
                        onClick={() => onRepairEdit()}
                        >
                            <TiPen />
                        </Button>
            </td>
            <td>
                <ul>
                    {arrayPlanRepair}
                </ul>
            </td>
            <td>
            
                    {arrayPlanMaterial}
            
            </td>

            <td>{props.i.comment}    </td>
            <td>{props.i.equipment}      </td>
            <td>{props.i.status}      </td>
            <td>{props.i.spendingJob}</td>
            <td>{props.i.priority}</td>
            <td>{props.i.author}</td>
            <td>{ format(parseISO(props.i.dateCreated), 'dd-MM-yyyy') }</td>
            <td>{ format(parseISO(props.i.dateFinished), 'dd-MM-yyyy') }</td>
        
        
        




        </tr>
        
    )
};



async function fetchListFromDb(url) {

    const tokenstr = "Bearer " + localStorage.getItem('accessToken');
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentialls: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': tokenstr
        },
        redirect: 'follow',
      };

    const res = await fetch(url, options);
    return res.json();
};


