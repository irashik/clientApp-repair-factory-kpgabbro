import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as log from 'loglevel';
import InputBidRequestForm from "./inputBidRequestForm";
import ReadListBidRequest from "./readListBidRequest";
import { StatusSelectField, CategorySelectField, PrioritySelectField } from './selectField';

log.setLevel('debug');



function BidRequest(props) {
  const [statusBid, setStatusBid] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [addedRecord, setAddedRecord] = useState([]);
  const [modalShow, setModalShow] = useState(false);

 
  return (
    <Container fluid className="m-0">
      <InputBidRequestForm  show={modalShow} 
                            onHide={() => setModalShow(false)}
                            handleAddedRecord={() => setAddedRecord([...addedRecord, 1])}
      />

      <Row>
        <Col sm={4}>
          <label>Фильтр по статусу заявки</label>
          <StatusSelectField statusBid={statusBid} handleStatus={(e) => setStatusBid(e)} />
        </Col>
        <Col>
          <label>Фильтр по категории</label>
          <CategorySelectField category={category} handleCategory={(e) => setCategory(e)} />
          </Col>

          <Col sm={4}>
            <label>Фильтр по приоритету</label>
           <PrioritySelectField priority={priority} handlePriority={(e) => setPriority(e)} />

        </Col>
        <Col>
          <Button variant="primary" 
                  id="AddBidRequest"
                  onClick={() => setModalShow(true)}>
                  Добавить заявку</Button>

        </Col>
      </Row>
      <Row>
        <ReadListBidRequest   addedRecord={addedRecord}
                              category={category}
                              priority={priority}
                              statusBid={statusBid}
        />
      </Row>
    </Container>
  );
    
};
export default BidRequest;

