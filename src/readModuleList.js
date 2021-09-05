/* модуль для загрузки списка записей ремонтов.

*/
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import {format, getMonth, parse, parseISO, addDays, formatISO, endOfDay, startOfDay} from 'date-fns';


registerLocale('ru', ru);

import * as log from 'loglevel';
log.setLevel('debug');





function ReadModuleList(props) {

    const [queryFromDb, setQueryFromDb] = useState([]);


    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment");
    
    log.info('readmoduleList props == ' + JSON.stringify(props));



    if ( _.isEmpty(props.unitEquipment) === false) {
        
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


       log.info(date1, date2);
       
    }


    useEffect(() => {


        
            fetchListFromDb(url).then(queryFromDb => {
                    setQueryFromDb(queryFromDb);
            });


    }, [props.repair, props.optedData, props.unitEquipment]);
    

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


    const onRepairEdit = (e) => {
        // открыть модальное окно
        // взять id 
        // в модальное нужно загрузить данные по id



    };

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


        <Row>
            Использованые материалы, запчасти:
            {arrayMaterial}
        </Row>
          
       

               
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
                        item='testidRepair'
                        onClick={onRepairEdit()}
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
