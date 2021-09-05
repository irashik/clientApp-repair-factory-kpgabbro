// страница "Отчет по оборудованию" 
// вводится в поле оборудование наименование оборудование по ввводу происходит запрос к апи 
// и загружаются записи по ремонтам конкретного оборудования.


import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


import SearchList from "./searchListUnitEquipment";

import { useDebouncedCallback } from 'use-debounce';
import ReadModuleList from "./readModuleList";





function ReportEquipment() {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');

    


    const delay = 1000;

    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        delay
    );

    const onChangeSearch = (e) => {
        const { value } = e.target
        setSearchString(value);
        debouncedSetFilter(value);
        setIdEquipment(null)

    };


    const handlerSelectEquipment = (id, joinNameUnit, e) => {

        setSearchString(joinNameUnit);
        setIdEquipment(id);

        console.log("id=" +  id, "data= " + joinNameUnit);
    };

    


   
      return (
        <Container fluid>
          <Row className="justify-content-md-center">
              <h2>Отчет по оборудованию</h2>
          </Row>

            <Row className="justify-content-start">

                <Form.Control   id='reportInputEquipment' size="sm" type="text" 
                                placeholder="Выберите оборудование"
                                value={searchString}
                                onChange={onChangeSearch}
                                idunit={idEquipment}
                                
                                
                                />


            <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />


            </Row>

            <Row>
                <ShowReadModuleList idEquipment={idEquipment} />


            </Row>
        </Container>
      )
};



function ShowReadModuleList(props)  {

    if (!props.idEquipment) {
        return null;
    } else {
        return <ReadModuleList unitEquipment={props.idEquipment} />;
    }

}




// function ReportEquipmentModule(props) {



//     return (
//         <Container fluid id='read-module' item=''>
//         <Row>
//             <Col sm={4}>
//                 <h5 id='reportDateRepair' item=''>Дата ХX.XX.XXXX</h5>
//                  <p id='reportRepairAuthor' item=''>Автор</p>
//             </Col>
//             <Col>
//                 <p>Выполненные работы</p>
//                 <div id='reportRepairDescription' 
//                         item="">

//                         </div>
//             </Col>
//             <Col sm={2}>
//                <InputGroup.Checkbox aria-label="Checkbox for following text input" 
//                                     data-toggle="tooltip" 
//                                     data-placement="top" 
//                                     title="Планирование"
//                                     id='ReportRepairCheckPlan'
//                                     item=''
//                                      disabled/>

//             </Col>
//         </Row>
//         {/* <Row>
//             <Col>
//                 <p>Наименование материала</p>
//             </Col>
//             <Col sm={4}>
//                 <p>Количество материала</p>
//             </Col>
//             <Col sm={2}>
//                 <InputGroup.Checkbox aria-label="Checkbox for following text input" data-toggle="tooltip" data-placement="top" title="Планирование" disabled/>
//             </Col>
//         </Row> */}

//     </Container>

//     );
// };



export default ReportEquipment;






