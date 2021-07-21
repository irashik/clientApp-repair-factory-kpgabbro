
import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { TiPen } from 'react-icons/ti';


import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
import {setHours, setMinutes } from 'date-fns';


import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

import "react-datepicker/dist/react-datepicker.css";




class InputData extends React.Component {
    
    // если нет в лок хранилище или срок использованиея..
    // проверка что вернуля не null? обработка ошибок?
    // await getUnitEquipmentList();
    //console.log('localstorage.setitem' + this.state.resultKeyListEquipment);
    //localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
     constructor(props) {
         super(props);
         this.state = {
            
         };
     }

    componentDidMount() {

        // const options = {
        //     method: 'GET',
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     credentialls: 'same-origin',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Access-Control-Allow-Origin': '*',
        //     },
        //     redirect: 'follow',
        //   };
    
        //   const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment"
          
        //   fetch(url, options)
        //     .then(res => res.json())
        //     .then(result => {
        //         const resultKeyListEquipment = makeKeyListEquipment(result);
        //         window.localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
    
        //         console.log(resultKeyListEquipment);

        //        this.setState({
        //            list: resultKeyListEquipment,
        //            isLoaded: true,
        //        });
               
  
    
        //   },
        //   error => {
        //         return null;
                
        //   });        


    }

render() {

   

    return (
        <Container fluid>
            <Row className="justify-content-md-center">
                <Col>
                    <DatePickerDiv />
                    <h2>Что сделано?</h2>
                </Col>
          </Row>
          <Row>

            <InputModule />

            
          </Row>
          <Button variant="outline-secondary" 
                id="AddRepairEquipment" >
                Добавить оборудование
            </Button>
           
           <ReadModule />
        </Container>
      
      )
  
    }
}

    




function DatePickerDiv() {

    // todo довать возможность выбора времени (интервалы полчаса)
    // доваить выбор начал и окончания ремонта

    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <>
            <DatePicker 
                locale="ru" 
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="dd MMMM yyyy"
                startDate={startDate}
                id='StartDateValue' />
        </>
    );
};

function InputModule() {

    // const [listEquipment, setListEquipment] = useState(() => {

    //     const options = {
    //         method: 'GET',
    //         mode: 'cors',
    //         cache: 'no-cache',
    //         credentialls: 'same-origin',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': '*',
    //         },
    //         redirect: 'follow',
    //       };
    
    //       const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment"
          
    //       fetch(url, options)
    //         .then(res => res.json())
    //         .then(result => {
    //             const resultKeyListEquipment = makeKeyListEquipment(result);
    //             window.localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
    
    //             console.log(resultKeyListEquipment);
    //            return(resultKeyListEquipment);
        //       },
    //       error => {
    //             return null;
    //       });        
       // });

  //  const [listEquipment, setListEquipment] = useState(null);


    // const [listEquipmentLocal, setListEquipmentLocal] = useState(() => {
    //     const initialState = window.localStorage.getItem('resultKeyListEquipment');
    //     return initialState;
    // })
 

    // useEffect(() => {
        

    // }, []);

    return   (    
        <Container fluid id='input-module'>
            <Row>
                <Col sm={4}>
                    <Form.Control id='inputEquipment' size="sm" type="text" placeholder="Выберите оборудование"  />
                    <InputEquipment />     
                </Col>
               
                <Col>
                    <Form.Control id='inputRepairDescription' as='textarea' size="sm" rows={3} placeholder="Что сделано?"  />
                </Col>
                    <Col sm={2}>
                        <InputGroupButtonSmall name="Equipment" />
                </Col>
            </Row>

        {/* <Row>
            
            <Col>
               <Form.Control id='inputMaterial' size="sm" type="text" placeholder="Введите материал"  />
            </Col>
            <Col sm={4} >
                <Form.Control id='inputMaterial' size="sm" type="text"  placeholder="Введите его количество"  />
            </Col>
            <Col sm={2}>
              <InputGroupButtonSmall name="Material" />
            </Col>
        </Row> */}
    </Container>
    
    )
    
};

function ReadModule() {
    return      (
        <Container fluid id='read-module'>
        <Row>
            <Col sm={4}>
                <p>Empty</p>

            </Col>
            <Col>
                <p>Empty</p>
                {/* добавить селектор id*/}
            </Col>
            <Col sm={2}>
               <InputGroup.Checkbox aria-label="Checkbox for following text input" disabled/>

            </Col>
        </Row>
        {/* <Row>
            <Col>
                <p>Empty</p>
            </Col>
            <Col sm={4}>
                <p>Empty</p>
            </Col>
            <Col sm={2}>
                <InputGroup.Checkbox aria-label="Checkbox for following text input" disabled/>
            </Col>
        </Row> */}
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                data-placement="top" 
                title="Редактировать"
                id='EditRepair'
                item=''
                >
                   <TiPen />

                </Button>

    </Container>

    );
};

function InputGroupButtonSmall(props) {
    return (

        <InputGroup className="mb-3">
        <InputGroup.Checkbox 
                    aria-label="Checkbox for following text input"
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Если планируется"
                    id='CheckRepairPlan'
                    />
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                data-placement="top" 
                title="Добавить"
                id='btnAddDescription'
                >+</Button>
        </InputGroup>


    );
};

function getUnitEquipmentList() {
    
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

      const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment"
      
      fetch(url, options)
        .then(res => res.json())
        .then(result => {

            // получить объект и сохранить себе.
            //console.log(JSON.stringify(result));

           
            // [
            //     {
            //         "_id": "605f4123c55a8c58e21fc0bc",
            //         "name": "Hello world",
            //         "description": "Hello World Description2"
            //     },
            //     {
            //         "_id": "60646d46408d404c10624b86",
            //         "name": "111",
            //         "description": "tesing"
            //     },

            // обрабатываем массив - объединяем поля
            const resultKeyListEquipment = makeKeyListEquipment(result);

            //window.localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);

           // this.setState({ resultKeyListEquipment: result})

           //console.log(result);

          // console.log(resultKeyListEquipment);

            return resultKeyListEquipment;


      },
      error => {
            throw new Error();
            console.log(error);
            return null;
      });
}

function makeKeyListEquipment(sourceArray) {
    let newArray = sourceArray.map(currentValue => {
        const id = currentValue._id;
        const mergeData = currentValue.name.concat(", ", currentValue.position, ", ", currentValue.group);
        const resultObject = { "_id": id, "mergedData": mergeData }
        return resultObject
    });
    return newArray
}

function KeyListObject(props) {
 

    console.log(props.value);

    let a = props.value;

    if(!a) {
        return ( <div> no Data</div>)
    } else {

   
        a.map(function(val) {
           
            return (
              <div className="" key={val._id}>
                  <p>{val.mergedData} </p>
              </div>
              

          )
       })
    
    }
           
      



    // console.log(object);

    // object.map((val) => {
    //     return (
    //         <div className="" key={val._id}>
    //             <p>{val.mergedData} </p>
    //         </div>
    //     )
    //     })
    


}

class InputEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           list: null,
           isLoaded: false
        }
    }

    componentDidMount() {

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
        
              const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment"
              
              fetch(url, options)
                .then(res => res.json())
                .then(result => {
                    const resultKeyListEquipment = makeKeyListEquipment(result);
                    window.localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
            
                   this.setState({
                       list: resultKeyListEquipment,
                       isLoaded: true,
                   });
              },
              error => {
                    this.setState({
                        list: null,
                        isLoaded: false
                    })
                    
              });        
    
    
         }
    
         render() {

           if(!this.state.isLoaded) {
               return (<div>no data </div>)
            } else {
                return (
                    this.state.list.map(function(val) {
                        return(
                            <div className="listUnitEquipment" key={val._id}>
                            <p>{val.mergedData} </p>
                            </div>
                        );
                    })
                )
            
            }

        }


}


export default InputData;


