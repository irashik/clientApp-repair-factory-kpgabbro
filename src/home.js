import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col';
import { Fancybox } from "@fancyapps/ui"
 

function HomeComponent() {
    
      return (
        <Container fluid id='homeComponent' >
          <Row id='mainPage'>
            <h2>Журнал учета ремонтов оборудования.</h2>
          <br>
          </br>
          <h4>Схема завода</h4>
          <Row>
            <Col>
            <a data-fancybox='gallery1' href="./image/1-1.png" data-caption="Schema 1">
              <Image src="./image/1-1_small.png" className="thumbnail" rounded="true" alt='схема 1-1'></Image>
            </a>

            </Col>
            <Col>
            
            <a data-fancybox='gallery1' href="./image/2-2.png" data-caption="Schema 2">
              <Image src="./image/2-2_small.png" className="thumbnail" rounded="true" alt='схема 2-2'></Image>
            </a>
            </Col>
            <Col>
            <a data-fancybox='gallery1' href="./image/3-3.png" data-caption="Schema 3">
              <Image src="./image/3-3_small.png" className="thumbnail" rounded="true" alt='схема 3-3'></Image>
            </a>
            </Col>
            <Col>
            <a data-fancybox='gallery1' href="./image/4-4.png" data-caption="Schema 4">
              <Image src="./image/4-4_small.png" className="thumbnail" rounded="true" alt='схема 4-4'></Image>
            </a>
            </Col>
          </Row>


          </Row>
        </Container>
      );
    
};
export default HomeComponent;


