import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import SearchList from "./searchListUnitEquipment";
import { useDebouncedCallback } from 'use-debounce';
import ReadModuleList from "./readModuleList";

function ReportEquipment() {
    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');

    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        process.env.DEBOUNCEDDELAY
    );
    function onChangeSearch(e) {
        const { value } = e.target;
        setSearchString(value);
        debouncedSetFilter(value);
        setIdEquipment(null);
    };
    function handlerSelectEquipment(id, joinNameUnit) {
        setSearchString(joinNameUnit);
        setIdEquipment(id);
    };

   

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <h2>Отчет по оборудованию</h2>
            </Row>
            <Row className="justify-content-start">
                <Col>
                    <Form.Control   id='reportInputEquipment' size="sm" type="text" 
                                placeholder="Выберите оборудование"
                                value={searchString}
                                onChange={onChangeSearch}
                                idunit={idEquipment}
                                />
                    <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
                </Col>
               
            </Row>
            <Row>
                <ShowReadModuleList idEquipment={idEquipment}/>
            </Row>
        </Container>
      )
};
export default ReportEquipment;


function ShowReadModuleList(props)  {

    if (!props.idEquipment) {
        return null;
    } else {
        return <ReadModuleList unitEquipment={props.idEquipment} />;
    }

};



