/* 
    модуль для загрузки списка записей о плановых работах! 
*/

import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import Table from 'react-bootstrap/Table'
import {format, parseISO } from 'date-fns';
import * as log from 'loglevel';
import { loadFromDb } from "../utils/loader";


log.setLevel('debug');





function ReadPlansListModule(props) {
    const [queryFromDb, setQueryFromDb] = useState([]);

    let error = null;

    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/repairplan");


    if (props.onSelectEquipment) {
        url.searchParams.set("equipment", props.onSelectEquipment);
        log.debug(props.onSelectEquipment);

    }

    if (props.onSelectStatus) {
        url.searchParams.set("status", props.onSelectStatus);
        log.debug(props.onSelectStatus);
    }



    useEffect(() => {
            loadFromDb(url)
            .then(queryFromDb => {
                    setQueryFromDb(queryFromDb);
            })
            .catch(e => {
                error = e;
            })

    }, [props.onAddedPlan, props.onSelectStatus, props.onSelectEquipment]);
    

    if(!queryFromDb.length) {
        return (
            <div>
                <h2>Нет записей</h2>
            </div>
        )
    } else if (error) {
        return (
            <div>
                <h2>{error}</h2>
            </div>
        )
    } else {
        return (
            <Table id='tablePlansRepair' responsive='mg' bordered hover>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th id='colPlan'>Плановые работы</th>
                        <th>Оборудование</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Примечание</th>
                        <th>Приоритет</th>
                        <th>Автор</th>
                        <th>Дата изменения статуса</th>
                        <th>Трудозатраты</th>
                    </tr>
                </thead>
                <tbody>
                    {queryFromDb.map((i) => {
                        return (
                            <ReadModuleBlock key={i._id} i={i} /> 
                        )
                    })}
                </tbody>
            </Table>
        )
    }
};
export default ReadPlansListModule;



function ReadModuleBlock(props) {
    const idRecord = props.i._id;
    
    const onRepairEdit = (e) => {
        
        // взять id 
        

        console.log(idRecord);
        // открыть модальное окно

        

        // в модальное нужно загрузить данные по id


    };

    const arrayPlanRepair = props.i.description.map((a, i) => {
        return(
            <li key={i}>{a} </li> 
        )
    });


    function DateFinishView(props) {
            if(props.dateFinished) {
                return (
                    <td>   { format(parseISO(props.dateFinished), 'dd-MM-yyyy') }</td>
                )
            } else {
                return ( <td></td>)
            }
    };

    
    
   
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
            <td>{props.i.equipment}      </td>
            <td>{props.i.status}      </td>
            <td>{ format(parseISO(props.i.dateCreated), 'dd-MM-yyyy') }</td>
            <td>{props.i.comment}    </td>
            <td>{props.i.priority}</td>         
            <td>{props.i.author}</td>
            <td>{props.i.spendingJob}</td>
           

            <DateFinishView dateFinished={props.i.dateFinished} />

           


        </tr>
    )
};





