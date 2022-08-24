import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as log from 'loglevel';
import InputBidRequestForm from "./inputBidRequestForm";
import ReadListBidRequest from "./readListBidRequest";
import { StatusSelectField, CategorySelectField, PrioritySelectField } from './selectField';
import { useDebouncedCallback } from 'use-debounce';
import Form from 'react-bootstrap/Form';


log.setLevel('debug');



function BidRequest(props) {
  const [statusBid, setStatusBid] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [addedRecord, setAddedRecord] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [searchTextDescription, setSearchTextDescription] = useState('');



  const debouncedSetFilterText = useDebouncedCallback(
    filterText => setFilterText(filterText),
    process.env.DEBOUNCEDDELAY
  );


  function onChangeSearchDescription(e) {
    const {value} = e.target;
    debouncedSetFilterText(value);
    setSearchTextDescription(value);

  }
 

  return (
    <Container fluid className="m-0" id='bidrequestComponent'>
      <InputBidRequestForm  show={modalShow} 
                            onHide={() => setModalShow(false)}
                            handleAddedRecord={() => setAddedRecord([...addedRecord, 1])}
      />


      <Row className="justify-content-md-center">
        <Col xs={5}><h2>Заявки снабжение</h2></Col>
        <Col ></Col>
        <Col xs={3}>
          <Button variant="primary" 
                    id="AddBidRequest"
                    onClick={() => setModalShow(true)}>
                    Добавить заявку</Button>
        </Col>
      </Row>
      <Row>
        <Col sm='auto'>
          <label>Фильтр по статусу заявки</label>
          <StatusSelectField statusBid={statusBid} handleStatus={(e) => setStatusBid(e)} />
        </Col>
        <Col sm='auto'>
          <label>Фильтр по категории</label>
          <CategorySelectField category={category} handleCategory={(e) => setCategory(e)} />
          </Col>

          <Col sm={4}>
            <label>Фильтр по приоритету</label>
           <PrioritySelectField priority={priority} handlePriority={(e) => setPriority(e)} />

        </Col>
        <Col>
          <label>Поиск по тексту</label>
            <Form.Control
                      id='inputFilterDescription' size="sm" type="text" 
                      placeholder="Текст для поиска"
                      value={searchTextDescription}
                      onChange={onChangeSearchDescription}
                      >
            </Form.Control>

        </Col>
      </Row>
      <Row>
        <ReadListBidRequest   addedRecord={addedRecord}
                              category={category}
                              priority={priority}
                              statusBid={statusBid}
                              onSearchDescription={filterText}

        />
      </Row>
    </Container>
  );
    
};
export default BidRequest;

