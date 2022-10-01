import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import SearchList from "./searchListUnitEquipment";
import { useDebouncedCallback } from 'use-debounce';
import ReadModuleList from "./readModuleList";
import Button from 'react-bootstrap/Button';



function ReportEquipment() {
    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');
    const [viewAll, setViewAll] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [searchText, setSearchText] = useState('');


    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        process.env.DEBOUNCEDDELAY
    );
    const debouncedSetFilterText = useDebouncedCallback(
        filterText => setFilterText(filterText),
        process.env.DEBOUNCEDDELAY
    );

    function onChangeSearch(e) {
        const { value } = e.target;
        setSearchString(value);
        debouncedSetFilter(value);
        setIdEquipment(null);
        setViewAll(false);
    };
    function handlerSelectEquipment(id, joinNameUnit) {
        setSearchString(joinNameUnit);
        setIdEquipment(id);
    };

    function viewAllPosition() {
        setIdEquipment(idEquipment);
        setViewAll(true);
    }

    function onChangeSearchText(e) {
        const {value} = e.target;
        debouncedSetFilterText(value);
        setSearchText(value);
    }
   

    return (
        <Container fluid id='reportComponent'>
            <Row className="justify-content-md-center">
                <h2>Отчет по оборудованию</h2>
            </Row>
            <Row className="justify-content-start">
                <Col sm>
                    <label>Выберите оборудование</label>
                    <Form.Control   id='reportInputEquipment' size="sm" type="text" 
                                className='reportInputField'
                                placeholder="Выберите оборудование"
                                value={searchString}
                                onChange={onChangeSearch}
                                idunit={idEquipment}
                                />
                    <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
                </Col>
                <Col sm>
                    <label>Поиск по тексту</label>
                    <Form.Control   id='reportInputTextSearch' size="sm" type="text" 
                                    className='reportInputField'
                                    placeholder="Введите текст"
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    />
                </Col>
                <Col sm>
                    <br></br>
                    <Button  size="sm" variant="secondary" onClick={viewAllPosition}>Показать все записи</Button>
                </Col>
               
            </Row>
            <Row>
                <ShowReadModuleList     idEquipment={idEquipment} 
                                        viewAllPosition={viewAll}
                                        onSelectSearchText={filterText}
                                        />
            </Row>
        </Container>
      )
};
export default ReportEquipment;


function ShowReadModuleList(props)  {

    if (!props.idEquipment) {
        return null;
    } else {
        return <ReadModuleList  unitEquipment={props.idEquipment} 
                                viewAllPosition={props.viewAllPosition} 
                                onSelectSearchText={props.onSelectSearchText}
                                />;
    }

};



