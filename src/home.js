
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


class HomeComponent extends React.Component {

  

    render() {
      return (
        <Container fluid >
          <Row>
            <h2>Это вэб приложения для ведения журнала ремонта оборудования.</h2>
          <p>Что-нибудь еще....</p>


          </Row>
        </Container>
      );
    };
};



export default HomeComponent;
