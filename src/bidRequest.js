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
import * as log from 'loglevel';
log.setLevel('debug');




function BidRequest(props) {
  
  const [bidRequest, setBidRequest] = useState("");
  const author = props.user;
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [newTask, setNewTask] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    createBidRequest(bidRequest, priority, category, author);
    setNewTask(newTask + 1);



  }
      return (
        <Container fluid className="m-0">
          <Row className="justify-content-md-center p-2 m-0">
            <h2>Книга заявок и предложений</h2>
          </Row>
          <Row className="p-0">
              <Form onSubmit={handleSubmit} className="m-0">
                <Row>
                <Form.Group>
                  <Form.Control id='createBid' as='textarea' className="m-0" rows={3} 
                  placeholder="Создайте заявку" 
                  value= {bidRequest}
                  onChange = { (e) => setBidRequest(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
              <Col sm={4}>
              <Form.Control as="select" 
                  size="sm" 
                  aria-label="Выберите категорию"
                  value={category}
                  onChange = { (e) => setCategory(e.target.value)}
                  id='selectCategory'
                  >
                  <option>Выберите категорию</option>
                  <option value="Инструмент">Инструмент</option>
                  <option value="Расходники">Расходники</option>
                  <option value="Запчасти">Запчасти</option>
                  <option value="Прочее">Прочее</option>
                </Form.Control>
              </Col>
              <Col sm={4}>
              <Form.Control as="select" size="sm" 
                    aria-label="Выберите приоритет"
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                    id='selectPriority'
                    >
                  <option>Выберите приоритет</option>
                  <option value="Срочно">Срочно!</option>
                  <option value="Планово">Планово</option>
                  <option value="Желательно">Желательно</option>
              </Form.Control>
              </Col>
                <Col sm={4}>
                  <Button id='btnCreateBid' type="submit" variant="secondary">Создать</Button>                
                </Col>
              </Row>



              </Form>
          </Row>
          <Row>
            <Col sm={4}>
                        <label>Фильтр по статусу заявки</label>
                          <Form.Control as='select' size="sm" aria-label="Выберите статус задачи">
                                  <option value="DRAFT">Черновик</option>
                                  <option value="CANCELED">Отменено</option>
                                  <option value="FINISHED">Завершено</option>
                                  <option value="DEFERRED">Отложено</option>
                                  <option value="INWORK">В работе</option>
                              </Form.Control>
                       
                    </Col>
            </Row>


          <Row>
            <BidRequestModule newTask={newTask}/>
          </Row>
        </Container>
      );
    
};
export default BidRequest;


//todo добавить связь при добавлении новой задачи
function BidRequestModule(props) {

  const [listBidRequest, setListBidRequest] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  
    getBitRequestList()
      .then(queryFromDb => {
        setListBidRequest(queryFromDb);
        setIsLoaded(true);
    });
  }, [props.newTask]);


  if (!isLoaded) {
    return <div>Нет заявок</div> 
  } else {

      

    return (
      listBidRequest.map((val, i) => {
        //if(!val.author) { val.author = 'test' }

        return(
          <Container fluid id='plan-read-module' key={i} className="mt-1 p-0">
            <Row className="m-0 p-0">
              <Col className="" sm={2}>
                <p className="mb-2" >
                  Дата создания:  {format(new Date(val.date), 'dd MMMM yyyy', {locale: ru} )}
                  <br></br>
                  Автор: {val.author}
                  </p >
                  <p>приоритет: {val.priority} 
                  <br></br>
                  категория: {val.category}</p>
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
                
                
                
          
              
            {/* </OverlayTrigger> */}
             </Col>
            </Row>
          </Container>

        );
      })
    );

  }

};


// todo переделай или отдельный модуль может?
function getBitRequestList() {
  return new Promise((resolve, reject) => {
    const tokenstr = "Bearer " + localStorage.getItem('accessToken');
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization':  tokenstr
      },
      redirect: 'follow',
    };
  
    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest"
  
    fetch(url, options)
      .then(res => res.json())
      .then(result => {

        resolve(result);
        
    },
    error => {
        throw new Error(error);
    });        

  })

 



}

function createBidRequest(text, priority, category, user) {
  
    const data = {
      name: text,
      author: user,
      date: new Date(),
      priority: priority,
      category: category
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

        if(result.statusCode !== 400) {
            alert("заявка записана!");
            setBidRequest("");
         } 
        else {
          alert(JSON.stringify(result));
        }

 
         
    },
    error => {
        throw new Error(error);
    });        
}