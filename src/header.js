import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class HeaderComponent extends React.Component {


    render() {
      return (
        <header>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <h1>Журнал ремонтов</h1>
            </Col>
            <Col lg="4">
            </Col>
            <Col xs lg="4">
              <h3>АО "КП-Габбро"</h3>
              <h3>Карьер Новый Поселок</h3>
            </Col>
          </Row>
        </Container>
        </header>
      )
  
    }
    


}


//export default HeaderComponent;