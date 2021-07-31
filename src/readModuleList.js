

import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader'


import Form from 'react-bootstrap/Form';
import { TiPen } from 'react-icons/ti';
import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDebouncedCallback } from 'use-debounce';

import ru from 'date-fns/locale/ru';
import {format, getMonth, parse, parseISO} from 'date-fns';

registerLocale('ru', ru);

//import SearchList from "./searchList";

import * as log from 'loglevel';
log.setLevel('debug');

import jQuery from 'jquery';
import * as _ from 'lodash';




function ReadModuleList(props) {

    const [queryFromDb, setQueryFromDb] = useState([]);
    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment");
    
    log.info('Readmoudle props= ' + JSON.stringify(props));
    log.info('readmoduleList= optedData=' + props.optedData);



    if ( _.isEmpty(props.unitEquipment) === false) {
        
        url.searchParams.set("equipment", props.unitEquipment);
    }
    if (props.optedData || props.onAddedRepair) {

       // период задать

        url.searchParams.set("dateRepair", props.optedData);
    }

    



    log.info('url in param' + url);


    useEffect(() => {
        fetchListFromDb(url).then(queryFromDb => {
                setQueryFromDb(queryFromDb);
        });



    }, [props.repair, props.optedData, props.unitEquipment]);


    /*
    для каждого элемента массива queryFromdb
    нужно отобразить элемент container c определенными полями.

    */

    log.info('array queryfromdb=' + queryFromDb.length);


    if(!queryFromDb.length) {
        return (
            <div>
                <h2>Нет записей</h2>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                {   queryFromDb.map((i) => {
                    return <ReadModuleBlock i={i} /> 
                    })
                }
            </React.Fragment>
        )
    }
};





function ReadModuleBlock(props) {

    const arrayRepair = props.i.repair.map(i => {
        return <li key={i}>{i}</li>
    });


    const arrayMaterial = props.i.material.map(i => {

        return (
            <Row>
                <Col sm={4} key={i._id}>            
                    {i.nameMaterial}
                </Col>
                <Col sm={4} >
                    {i.valueMaterial}
                </Col>
            </Row>
        );
    });


    function ArrayRepairPlan(props) {

        const resultArray = props.repairPlan.map((i, a) => {
            return (
                <Row>Плановые работы {a+1}:
                    <Col sm={4} key={i._id}>
                        Описание: {i.description}
                    </Col>
                        {showDateFinish}
                </Row>
            )


            function showDateFinish() {
                if(i.finish) {
                    return (
                        <Col>
                            Дата выполнения: {i.dateFinish};
                        </Col>
                    );
                } else {
                    return null;
                };
            
            }


            
        });

        return resultArray
        

        
    };


  
    function ArrayMaterialPlan(props) {

        const resultArray = props.materialPlan.map((i, a) => {
            return (
                <Row>Планируемые материалы {a+1}:
                    <Col sm={4} key={i._id}>            
                        Материал:    {i.nameMaterial}
                    </Col>
                    <Col sm={4} >
                        Количество: {i.valueMaterial}
                    </Col>
                    {showDateFinish}
                </Row>
            )

            function showDateFinish() {
                if(i.finish) {
                    return (
                        <Col>
                            Дата выполнения: {i.dateFinish};
                        </Col>
                    );
                } else {
                    return null;
                };
            
            }

            
        });

        return resultArray;

       
    };




    return (
        <Container fluid id='read-module' className="m-2">
        <Row>
            <Col sm={4} id='Readmoduleblock-equipment'>
                Оборудование: {props.i.equipment}<br></br>
                Автор: {props.i.author}<br></br>
                
                        

            </Col>
            <Col id='readmoduleblock-repair'>
                Выполненные работы:
                <ul>
                    {arrayRepair}
                </ul>
             
            </Col>
            
            <Col>
                    Дата начала: { format(parseISO(props.i.dateRepairStart), 'dd-MM-yyyy, hh-mm') }
                    Дата окончания: { format(parseISO(props.i.dateRepairEnd), 'dd-MM-yyyy, hh-mm') }
            </Col>
            
            {/* <Col sm={2}>
               <InputGroup.Checkbox aria-label="Если планирование" disabled/>
            </Col> */}

        </Row>

        <ArrayRepairPlan repairPlan={props.i.repairPlan} />

        <Row>
            Использованые материалы, запчасти:
            {arrayMaterial}

        </Row>
          
       

        <ArrayMaterialPlan materialPlan={props.i.materialPlan} />


               
        {/* <Row>
     
         



            <Col sm={2}>
                <InputGroup.Checkbox aria-label="" disabled/>
            </Col>
        </Row> */}





        <Row>
            <Col>
                <Button variant="outline-dark" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Редактировать"
                        id='EditRepair'
                        item=''
                        >
                            <TiPen />
                        </Button>
            </Col>
        </Row>
        

        </Container>
    )
};
export default ReadModuleList;




async function fetchListFromDb(url) {

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentialls: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
      };

    const res = await fetch(url, options);
    return res.json();
};
