

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
import {format, getMonth} from 'date-fns';

registerLocale('ru', ru);

//import SearchList from "./searchList";

import * as log from 'loglevel';
log.setLevel('debug');

import jQuery from 'jquery';




function ReadModuleList(props) {
    const [queryFromDb, setQueryFromDb] = useState([]);
    
    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment");
    url.searchParams.set("dateRepair", props.optedData);




    useEffect(() => {
        fetchListFromDb(url).then(queryFromDb => {
                setQueryFromDb(queryFromDb);
        });



    }, [props.repair, props.optedData]);


    /*
    для каждого элемента массива queryFromdb
    нужно отобразить элемент container c определенными полями.

    */

    log.info('array queryfromdb=' + queryFromDb.length);


    if(!queryFromDb.length) {
        return (
            <div>
                <h2>Нет записей за данное число</h2>
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
}

function ReadModuleBlock(props) {


    return (
        <Container fluid id='read-module' className="m-2">
        <Row>
            <Col sm={4} id='Readmoduleblock-equipment'>
                {props.i.equipment}

            </Col>
            <Col sm={4} id='readmoduleblock-repair'>
                {/* / add array function map */ }
                {props.i.repair}
            </Col>
            
            <Col sm={2}>
               <InputGroup.Checkbox aria-label="Checkbox for following text input" disabled/>

            </Col>
        </Row>


        { props.i.material.map((item) => {
                return (
                    <Row>
                        <Col sm={4} key={item._id}>            
                            {item.nameMaterial}
                        </Col>
                        <Col sm={4} >
                            {item.valueMaterial}
                        </Col>
                    </Row>
                );
        })}
     


     
               
        <Row>



            
            
            
            
            <Col sm={4} id='readmoduleblock-repairplan'>
                {props.i.repairPlan.map((item) => {
                    return(
                        <div key={item._id}>
                            {item.description}
                            {item.dateFinish}
                            {item.fihish}
                        </div>
                    )
                })}

            </Col>




            <Col sm={2}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" disabled/>
            </Col>
        </Row>

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
    );
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
