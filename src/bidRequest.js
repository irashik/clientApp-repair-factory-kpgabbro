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

import { Tooltip} from 'react-bootstrap/Tooltip';
import { OverlayTrigger } from "react-bootstrap/OverlayTrigger";
import FloatingLabel from 'react-bootstrap-floating-label';




function BidRequest() {
  
  const [bidRequest, setBidRequest] = useState("");
  const author = null;
  const date = null;


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bidRequest);


        //    const result = createBidRequest(bidRequest);

        const user = 'testUser' // откуда его взять из контекста

        const data = {
          name: bidRequest,
          author: user,
          date: new Date(),
          priority: 'test',
          category: 'test'

        }






            const options = {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentialls: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
              redirect: 'follow',
              body: JSON.stringify(data)
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

            //   {
            //     "inwork": false,
            //     "performed": false,
            //     "_id": "60f938cea970697af5513d19",
            //     "name": "testBid",
            //     "author": "postman",
            //     "date": "2021-07-22T09:22:22.072Z",
            //     "priority": "test",
            //     "__v": 0
            // }


                  //console.log(result);
//                  return result;
                  alert(JSON.stringify(result));



                  //alert("заявка записана!");
                  setBidRequest("");
                // обнови состояние!!
                


            },
            error => {
                throw new Error(error);
                //return null;
      
});        
    
  

  }


      return (
        <Container fluid className="m-0">
          <Row className="justify-content-md-center p-2 m-0">
            <h2>Книга заявок и предложений</h2>
          </Row>
          <Row className="p-0">
              <Form onSubmit={handleSubmit} className="m-0">
                <Form.Group>
                  <Form.Control id='createBid' as='textarea' className="m-0" rows={3} 
                  placeholder="Создайте заявку" 
                  value= {bidRequest}
                  onChange = { (e) => setBidRequest(e.target.value)}
                  
                  />

                </Form.Group>

              
                
             

             
              <Form.Control as="select" size="sm" aria-label="Выберите категорию">
                  <option>Выберите категорию</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Control>


              <Form.Control as="select" size="sm" aria-label="Выберите приоритет">
                  <option>Выберите приоритет</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Control>

                <Button id='btnCreateBid' type="submit" variant="secondary">Создать</Button>

              </Form>

              
          
                
          </Row>
          <Row>
            <BidRequestModule />
          </Row>
        </Container>
      );
    
};





function BidRequestModule() {

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

    return (
      listBidRequest.map((val) => {
        return(
          <Container fluid id='plan-read-module' className="mt-1 p-0">
            <Row className="m-0 p-0">
              <Col className="" sm={2}>
                <p className="mb-2" >
                  Дата создания:  {format(new Date(val.date), 'dd MMMM yyyy', {locale: ru} )}
                  <br></br>
                  Автор: {val.author}
                  </p >
                  <p>приоритет: {val.priority} </p>
              </Col>
              <Col>
                <div item={val._id}>
                <h6>{val.name}</h6>
                </div>
              </Col>
              <Col sm={2}>
                                          

       
              {/* <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay=""
                // {() => { return (<Tooltip id="button-tooltip">Simple tooltip</Tooltip>) }}
              > */}

                <Form.Group className="mb-1"  id="checkboxInworkstatus">
                  <Form.Check type="checkbox" className="checkboxBidRequest p-1" 
                      checked={val.inwork} 
                      label="в работе. Дата: {val.inworkDate}" 
                      
                      
                      />
                </Form.Group>   

                <Form.Group className="mb-1"  id="checkboxPerformedStatus">
                  <Form.Check type="checkbox" className="checkboxBidRequest p-1" 
                      checked={val.performed} 
                      label="выполнено. Дата: {val.performedDate}" 
                      
                      
                      />
                </Form.Group>   
                
                
                <p>категория: {val.category}</p>
          
              
            {/* </OverlayTrigger> */}
             </Col>
            </Row>
          </Container>

        );
      })
    );

  }

};

export default BidRequest;



function createBidRequest(text) {


    const user = 'testUser' // откуда его взять из контекста

    const data = {
      name: text,
      author: user,
      date: new Date(),
      priority: 'test',
      category: 'test'

    }






    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      redirect: 'follow',
      body: JSON.stringify(data)
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

    //   {
    //     "inwork": false,
    //     "performed": false,
    //     "_id": "60f938cea970697af5513d19",
    //     "name": "testBid",
    //     "author": "postman",
    //     "date": "2021-07-22T09:22:22.072Z",
    //     "priority": "test",
    //     "__v": 0
    // }
   

          //console.log(result);
          return result;
       
        


    },
    error => {
        throw new Error(error);
         //return null;
          
    });        


}