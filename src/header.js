import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function HeaderComponent() {


    
      return (
        <header>
          <Container fluid>
            <Row>
              <Col>
                <h3>Журнал ремонтов</h3>
              </Col>
              
              <Col>

              </Col>
              
              <Col>
                <p id='nameCompany'>АО "КП-Габбро", Карьер Новый Поселок</p>
              </Col>
              </Row>
            

          </Container>

          



        </header>
      )
  
    
    


};
export default HeaderComponent;
