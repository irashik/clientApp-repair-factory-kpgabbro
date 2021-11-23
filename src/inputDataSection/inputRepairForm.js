/* форма (модальное окно) для ввода данных о ремонте.
*/

import React, { useEffect, useMemo, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDebouncedCallback } from 'use-debounce';
import ru from 'date-fns/locale/ru';
import {format, parseISO, formatISO, endOfDay, startOfDay } from 'date-fns';
import { loadFromDb, unloadInDb, unloadInDbPatch } from "../utils/loader";
import SearchList from "../searchListUnitEquipment";
import * as log from 'loglevel';
import { result } from "lodash";

log.setLevel('debug');
registerLocale('ru', ru);



function InputRepairForm(props) {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');
    
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [spendingJob, setSpendingJob] = useState('');
    
    const [repair, setRepair] = useState([]);
    const [repairCount, setRepairCount] = useState([1]);

    const [materialCount, setMaterialCount] = useState([]);
    const [material, setMaterial] = useState([]);
    const [value, setValue] = useState([]);

    const [idRecord, setIdRecord] = useState('');
    const [sourceRepair, setSourceRepair] = useState([]);
    const [sourceMaterial, setSourceMaterial] = useState([]);
    const [author, setAuthor] = useState('');

    const [sourceDateStart, setSourceDateStart] = useState('');
    const [sourceDateEnd, setSourceDateEnd] = useState('');

    
    const debouncedSetFilter = useDebouncedCallback(
        filter => setFilter(filter),
        process.env.DEBOUNCEDDELAY
    );

    function onChangeSearch(e) {
        const a = e.target.value.toString();
        setSearchString(a);
        debouncedSetFilter(a);
        setIdEquipment(null);
    };
    function handlerSelectEquipment(id, joinNameUnit) {
        setSearchString(joinNameUnit);
        setIdEquipment(id);
    };
    function onClickAddedRepair() {
        // собрать данные из полей

        let materialJoin = material.map((i, a) => {
            let t = { name: i, value: value[a]};
            return t;
        });

        // подготовить данные для отправки на сервер
        const data = {
            dateRepairStart: dateStart,
            dateRepairEnd: dateEnd,
            equipment: idEquipment,
            repair: repair,
            author: localStorage.getItem('userId'),
            material: materialJoin,
            spendingJob: spendingJob
        };
        // записать в базу
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment";

        unloadInDb(url, data)
            .then(result => {

                // все хорошо, сказать ок. и закрыть окно.
                // очистить поля остальные сами очищаются
                setSearchString('');
                setIdEquipment('');
                setSpendingJob('');
                setRepairCount([]);
                setFilter('');


                // закрыть модальное окно.
                props.onHide();
                props.handleAddedRepair(); // для обновление списка ремонтов. 
                

                })
                .catch(err => {
                    alert('catch==' + JSON.stringify(err));
                    return new Error(err);
                });
    };
    function onClickUpdateRepair() {

        // собрать данные из полей
        let materialJoin = material.map((i, a) => {
            let t = { name: i, value: value[a]};
            return t;
        });

        // подготовить данные для отправки на сервер
        let data = {
            dateRepairStart: dateStart,
            dateRepairEnd: dateEnd,
            equipment: idEquipment,
            repair: repair,
            author: localStorage.getItem('userId'),
            material: materialJoin,
            spendingJob: spendingJob
        };

        // записать в базу
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                    "/equipment" + "/" + idRecord;


        unloadInDbPatch(url, data)
            .then(result => {

                // все хорошо, сказать ок. и закрыть окно.
                // очистить поля остальные сами очищаются
                setSearchString('');
                setIdEquipment('');
                setSpendingJob('');

                setRepairCount([]);

                setMaterialCount([]);
                setDateStart('');
                setDateEnd('');
                setRepair([]);
                setMaterial([]);
                setValue([]);
                setIdRecord('');
                setSourceMaterial([]);
                setSourceRepair([]);
                setAuthor('');

                setFilter('');
                
                props.onHide(); // закрыть модальное окно.
                props.handleAddedRepair(); // для обновление списка ремонтов. 
                
                alert('unload OK. ' + result);

                })
                .catch(err => {
                    alert('catch==' + JSON.stringify(err));
                    return new Error(err);
                });




    };
    function onHandleRepairCount() {
        setRepairCount([...repairCount, 1]);
    };
    function onHandleMaterialCount() {
        setMaterialCount([...materialCount, 1]);
    };
    function onSelectOptedDateStart(selectedDate) {
        setDateStart(selectedDate);
    };
    function onSelectOptedDateEnd(selectedDate) {
        setDateEnd(selectedDate);
    };
    function OnRecordRepair(record) {
        setRepair(record);
    }
    function OnRecordMaterial(record) {
        setMaterial(record);
    }
    function OnRecordValue(record) {
        setValue(record);
    };
    function BtnView(props) {
       
        if(props.onLoadRecord) {
            return (
                <Button variant="primary"    
                            id="UpdateRepairbtn"
                            className="m-3 d-grid gap-2" 
                            onClick={onClickUpdateRepair}
                        >Обновить
                </Button>
            ) ;
        } else {
            return (
                <Button variant="primary"    
                            id="CreateRepairbtn"
                            className="m-3 d-grid gap-2" 
                            onClick={onClickAddedRepair}
                        >Создать
                </Button>
            );
        }
    }
    




    useEffect(() => {

        log.debug('useEffect is run');
        if(props.onLoadRecord) {

            log.debug('useEffect is run if props.onLoadRecord');


            let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                     "/equipment/" + props.onLoadRecord);

            loadFromDb(url)
                .then(result => {

                    setIdRecord(result._id);
                    setIdEquipment(result.equipment);
                    setSpendingJob(result.spendingJob);

                    setSourceDateStart(result.dateRepairStart);
                    setSourceDateEnd(result.dateRepairEnd);

                    setDateStart(result.dateRepairStart);
                    setDateEnd(result.dateRepairEnd);



                    setSourceRepair(result.repair);

                    let a = new Array(result.repair.length);
                    setRepairCount(a);

                    setAuthor(result.author);
                    setSourceMaterial(result.material);
    
                    // idEquipment есть нужна строка.
                    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + 
                            "/unit-equipment" + "/" + result.equipment);

                    loadFromDb(url).then(result => {
                        let fullName = result.position + " " + result.group;
                        setSearchString(fullName);
                        // а как же отслеживание состояния? - будет тогда еще один запрос.
                       //todo этот код похоже ненадежный, но он работает. )
                    })
                    .catch(e => {
                        throw new Error(e);
                    })
                })
                .catch(e => {
                    throw new Error(e);
                });
        }

        
            return function cleanup() {

                props.resetIdRecord();
                setIdRecord('');
                setIdEquipment('');
                setSpendingJob('');
                setDateStart('');
                setDateEnd('');
                setSourceRepair([]);
                setAuthor('');
                setSourceMaterial([]);

                setSourceDateEnd('');
                setSourceDateStart('');
                setSearchString('');

                setFilter('');

                setRepairCount([1]);
                log.info('cleanup modal window');


            }
        

    }, [props.onLoadRecord])


    const { handleAddedRepair, resetIdRecord, onLoadRecord, ...modal} = props;
   
   
   function modalClose() {

        log.debug('modalClose');

        props.onHide();
        if(props.onLoadRecord) {
            props.resetIdRecord();
        }
       
       setIdRecord('');
       setIdEquipment('');
       setSpendingJob('');
       setDateStart('');
       setDateEnd('');
       setSourceRepair([]);
       setAuthor('');
       setSourceMaterial([]);

       setSourceDateEnd('');
       setSourceDateStart('');
       
       setRepairCount([1]);


   }

    return   (    
        <Modal {...modal} 
            backdrop="static"
            dialogClassName='modal-fullscreen'
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма ввода данных о работах
                </Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalClose}

                ></button>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container fluid id='input-module'>
                    <Row>
                        <Col>
                            <label>Время начало ремонта
                                <DatePickerDiv type='dateStart' onSelectOptedData={onSelectOptedDateStart} setDate={sourceDateStart}/>
                            </label>
                        </Col>
                        <Col>
                            <label>Время окончания ремонта
                                <DatePickerDiv type='dateEnd' onSelectOptedData={onSelectOptedDateEnd} setDate={sourceDateEnd}/>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Form.Control 
                                    id='inputEquipment' size="sm" type="text" 
                                    placeholder="Выберите оборудование"
                                    value={searchString}
                                    onChange={onChangeSearch}
                                    idunit={idEquipment}
                                    />
                            <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />
                        </Col>
                        <Col md={6}>
                            <FormInputRepair    count={repairCount} onHandleRepair={OnRecordRepair} 
                                                onLoadRepair={sourceRepair} />
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall name="equipment" onHandleRepairCount={onHandleRepairCount} />
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <FormInputMaterial  count={materialCount} onHandleMaterial={OnRecordMaterial} 
                                                onHandleMaterialVal={OnRecordValue}
                                                onLoadMaterial={sourceMaterial}
                                                />
                        </Col>
                        <Col md={2}>
                            <InputGroupButtonSmall name="material" onHandleMaterialCount={onHandleMaterialCount} />
                        </Col>
                    </Row>
                    <Row>
                        <Form.Control id='inputSpendingJob' size="sm" type="text" 
                                        placeholder="Трудозатраты"
                                        value={spendingJob}
                                        onChange={(e) => setSpendingJob(e.target.value)}
                                        />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <BtnView onLoadRecord={idRecord} />
            </Modal.Footer>
        </Modal>        
    )
};
export default InputRepairForm;


function InputGroupButtonSmall(props) {

    let onAddedRecord = null;

    if(props.name === "equipment") {
        onAddedRecord = () => {
            props.onHandleRepairCount();
        }
    } 
    
    if (props.name === "material") {
       onAddedRecord = () => {
            props.onHandleMaterialCount();
        }
    }

    return (
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                className=""
                data-placement="top" 
                title="Добавить запись"
                id='btnAddDescription'
                onClick={() => onAddedRecord()}
                >+</Button>
    );
};
function DatePickerDiv(props) {

    // todo довать возможность выбора времени (интервалы полчаса)
    // доваить выбор начал и окончания ремонта

    //Locale with time



    const year =  new Date().getFullYear();
    const month = new Date().getMonth()
    const day = new Date().getDate();
    const hours = new Date().getHours();

    const [valueDate, setValueDate] = useState(new Date(year, month, day, hours));


  
    const handlerOptedData = (e) => {
        setValueDate(e);    
        props.onSelectOptedData(e);

    };

    useEffect(() => {
        

        if(props.setDate) {

            let newDate = parseISO(props.setDate);
            setValueDate(newDate);

        } else {
            props.onSelectOptedData(valueDate);
        }

        return function cleanup() {
            setValueDate('');

        }

    }, [props.setDate]);

    if(props.type === 'dateStart') {

    }

    if(props.type === 'dateEnd') {

    }




    return (
        <React.Fragment>
            <DatePicker 
                            className="m-3"
                            locale="ru" 
                            selected={valueDate}
                            onChange={(date) => handlerOptedData(date)}
                            locale="ru"
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={30}
                            dateFormat="dd MMMM yyyy HH:mm"
                            //startDate={valueDate}
                            id='StartDateValue' />
        </React.Fragment>
    );
};
function FormInputRepair(props) {

    const [count, setCount] = useState([]);
    const [repair, setRepair] = useState([]);


    function onHandleRepair(e, i) {
        let cloneRepair = [...repair];
        cloneRepair[i] = e;
        setRepair(cloneRepair);
        props.onHandleRepair(cloneRepair);
    }



    useEffect(() => {
       setCount([...count, 1]);

       return function cleanup() {
            setCount([]);
        }

    }, [props.count])
       

    useEffect(() => {
        if(props.onLoadRepair.length) {
            setRepair(props.onLoadRepair); // задай массив данных в состояние
            let newCount = new Array(props.onLoadRepair.length);
            setCount(newCount);
        }

      
        return function cleanup() {
            setCount([]);
            setRepair([]);
        }
        
    }, [props.onLoadRepair])

    
    const arrayList = count.map((a, i) => {
            return result(i);
        });
    
        
    function result(i) {
        return(
            <Form.Control id='inputRepairDescription' as='textarea' size="sm" rows={3} 
                placeholder="Что сделано?"
                key={i} 
                size="sm" rows={4}
                value={repair[i]}
                onChange={(e) => onHandleRepair(e.target.value, i)}
                />
        )
    }
    

    return (
        <React.Fragment>
         { arrayList }
        </React.Fragment>
    )

   
    
};


function FormInputMaterial(props) {

    const [count, setCount] = useState([]);
    const [material, setMaterial] = useState([]);
    const [valueMat, setValueMat] = useState([]);



    function onHandleMaterial(e, i) {
        let cloneMaterial = [...material];
        cloneMaterial[i] = e
        setMaterial(cloneMaterial);
        props.onHandleMaterial(material);

   }

    function onHandleMaterialVal(e, i) {
        let cloneValue = [...valueMat];
        cloneValue[i] = e;
        setValueMat(cloneValue);
        props.onHandleMaterialVal(valueMat);
        
    }


    useEffect(() => {
        setCount([...count, 1]);
        
    }, [props.count])

    function result(i) {
        return (
            <Row key={'inputMaterial-'+i}>
                <Col>
                    <Form.Control id={'inputMaterialName-'+i} size="sm" type="text" 
                    placeholder="Введите материал"
                    key={i+'name'}
                    value={material[i]}
                    onChange={(e) => onHandleMaterial(e.target.value, i)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control id={'inputMaterialVal-'+i}  size="sm" type="text"  
                    placeholder="Введите его количество"
                    key={i+'val'}
                    value={valueMat[i]}
                    onChange={(e) => onHandleMaterialVal(e.target.value, i)}
                    />
                </Col>
            </Row>
            )
        };

    let arrayList = count.map((a, i) => result(i));
    return arrayList;


};

