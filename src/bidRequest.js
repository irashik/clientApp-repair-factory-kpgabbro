// Страница заявок и предложений
/*
пользователь может добавить новую заявку
Пользователь видит все заявки

*/

import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';





class BidRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        
    };
  }

  componentDidMount() {
      // let data = await loadBidRequest();

      // this.setState({
      //   bidRequestList: data,
      //   isLoaded: true
      // });





  }


    render() {



      return (
        <Container fluid>
          <Row className="justify-content-md-center">
            <h2>Заявки и предложения</h2>
          </Row>
          <Row>
           
                <Form.Control id='createBid' as='textarea' rows={3} placeholder="Создайте заявку"  />
                <Button id='btnCreateBid' variant="primary">Создать</Button>
           


          </Row>
          <Row>
            <BidRequestModule />
          </Row>
        </Container>
      );
    };
};





function BidRequestModule() {

  // const [listBidRequest, setListBidRequest] = useState(() => {
  //   const initialState = loadBidRequest();
  //   return initialState;

  // });

  const [listBidRequest, setListBidRequest] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    

    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      redirect: 'follow',
    };

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest"

    fetch(url, options)
      .then(res => res.json())
      .then(result => {
          
        // получаем массив объектов вида.
      //   {
      //     "inwork": false,
      //     "performed": false,
      //     "_id": "605ca13d2464576aa8a530d3",
      //     "name": "Dmitrii",
      //     "date": "2021-03-25T14:38:48.872Z",
      //     "author": "Tanya",
      //     "__v": 0
      // },
      // {
      //     "inwork": false,
      //     "performed": false,
      //     "_id": "605d7108dedd3568384240a2",
      //     "name": "Tanya, im' love you",
      //     "date": "2021-03-25T14:38:48.872Z",
      //     "author": "Tanya",
      //     "__v": 0
      // },

          //console.log(result);
          setListBidRequest(result);
          setIsLoaded(true);
    },
    error => {
        throw new Error(error);
         //return null;
          
    });        


  }, []);



  if (!isLoaded) {
    return <div>Нет заявок</div> 
  } else {

        //"inwork": false,
      //     "performed": false,
      //     "_id": "605ca13d2464576aa8a530d3",
      //     "name": "Dmitrii",
      //     "date": "2021-03-25T14:38:48.872Z",
      //     "author": "Tanya",
  
//  return (
//     <div>is loaded true
//     { listBidRequest.map(
//       (item) => {
//       return <p> {item._id} </p>
//     }) 
//   }
//     </div>

//   )

    return (
    listBidRequest.map((val) => {
      return(
        <Container fluid id='plan-read-module'>
          <Row>
            <Col sm={2}>
              <p>
                Дата:  {format(new Date(val.date), 'dd MMMM yyyy', {locale: ru} )}
                <br></br>
                Автор: {val.author}
                </p>
            </Col>
            <Col>
              <div item={val._id}>
              <h6>{val.name}</h6>
              </div>
            </Col>
            <Col sm={2}>
                                        
              
              <Form.Group className="mb-1"  id="formGridCheckbox">
                <Form.Check type="checkbox" className="checkboxBidRequest" checked={val.inwork} label="в работе." />
              </Form.Group>
              
            </Col>
          </Row>
        </Container>

    );
  })
    );

  }

};





export default BidRequest;

function loadBidRequest() {

    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      redirect: 'follow',
    };

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest"

    fetch(url, options)
      .then(res => res.json())
      .then(result => {
          
        // получаем массив объектов вида.
      //   {
      //     "inwork": false,
      //     "performed": false,
      //     "_id": "605ca13d2464576aa8a530d3",
      //     "name": "Dmitrii",
      //     "date": "2021-03-25T14:38:48.872Z",
      //     "author": "Tanya",
      //     "__v": 0
      // },
      // {
      //     "inwork": false,
      //     "performed": false,
      //     "_id": "605d7108dedd3568384240a2",
      //     "name": "Tanya, im' love you",
      //     "date": "2021-03-25T14:38:48.872Z",
      //     "author": "Tanya",
      //     "__v": 0
      // },

          console.log(result);


          return result;
       
        


    },
    error => {
        throw new Error(error);
         //return null;
          
    });        


}