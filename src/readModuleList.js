/* модуль для загрузки списка записей ремонтов. */

import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import Table from 'react-bootstrap/Table'
import {format, parseISO, formatISO, endOfDay, startOfDay } from 'date-fns';
import log from 'loglevel';
import _ from 'lodash';

import { loadFromDb } from './utils/loader';
import InputRepairForm from "./inputDataSection/inputRepairForm";


log.setLevel('debug');


function ReadModuleList(props) {
    const [queryFromDb, setQueryFromDb] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [idRecord, setIdRecord] = useState('');
    const [addedRepair, setAddedRepair] = useState([]);

    let url = new URL (process.env.HTTP_API_HOST + ":" + 
                        process.env.HTTP_API_PORT + "/equipment");
    

    if (props.unitEquipment) {
        url.searchParams.set("equipment", props.unitEquipment);
    }

    if (props.optedData || props.onAddedRepair) {
       let date1 = startOfDay(props.optedData); // дата со временем 00:00 
       let date2 = endOfDay(date1);    // прибавляю день

       date1 = formatISO(date1, {});
       date2 = formatISO(date2, {});

       url.searchParams.set("dateRepairStart", "dateRepairStart");
       url.searchParams.set("minDate", date1);
       url.searchParams.set("maxDate", date2);
    }


    useEffect(() => {
            loadFromDb(url)
                .then(result => {
                        setQueryFromDb(result);
                })
                .catch(err => {
                    alert('Error from server', err);
                    throw new Error('respons from server bad', err);
                });

    }, [props.repair, props.optedData, props.unitEquipment, props.onAddedRepair, addedRepair]);
    

    function onChangeRecord(e) {
        setIdRecord(e);
    };
    function onHandleAddedRepair() {
        setAddedRepair([...addedRepair, 1]);
    };



    if(!queryFromDb) {
        return (
            <div>
                <h2>Нет записей</h2>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <InputRepairForm    show={modalShow}
                                    onHide={()  => setModalShow(false)}
                                    onLoadRecord={idRecord}
                                    resetIdRecord={() => setIdRecord('')}
                                    handleAddedRepair={onHandleAddedRepair}
                                    />

                <Table id='tableRepair' responsive='mg' bordered hover>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th>Дата начала</th>
                            <th>Дата окончания</th>
                            <th>Оборудование</th>
                            <th>Выполненные работы</th>
                            <th>Материалы, запчасти</th>
                            <th>Автор</th>
                            <th>Трудозатраты</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryFromDb.map((i) => {
                            return (
                                <ReadModuleBlock i={i} key={i._id}
                                    onOpenRecord={() => onChangeRecord(i._id)}
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
export default ReadModuleList;


function ReadModuleBlock(props) {

    function onRepairEdit() {
        props.onModalShow();
        props.onOpenRecord();
    };

    const arrayRepair = props.i.repair.map((i, a) => {
        return (
             <li key={a}>{i.type}:{i.description}</li>
        )
    });
    const arrayMaterial = props.i.material.map((i,a) => {
        return (
            <li key={a}>
                {i.name}; Кол-во: {i.value};
            </li>
        );
    });


    return (
        <tr className="itemRecord">
            <td>
                <Button variant="outline-dark" data-toggle="tooltip" 
                                data-placement="top" title="Редактировать"
                                id='editRepair'
                                onClick={onRepairEdit}>
                                    <TiPen />
                </Button>
            </td>
            <td>{ format(parseISO(props.i.dateRepairStart), 'dd-MM-yyyy, HH:mm') }</td>
            <td>{ format(parseISO(props.i.dateRepairEnd), 'dd-MM-yyyy, HH:mm') }</td>
            
            <td>{props.i.equipment}</td>
            <td>
                <ul>
                    {arrayRepair}
                </ul>
            </td>
            <td>
                <ul>
                    {arrayMaterial}
                </ul>
            </td>
            <td>{props.i.author}</td>
            <td>{props.i.spendingJob}</td>
        </tr>
    )
};


