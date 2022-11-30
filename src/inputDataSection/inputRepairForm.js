import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker, { registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDebouncedCallback } from 'use-debounce';
import ru from 'date-fns/locale/ru';
import {addHours, parseISO, startOfHour } from 'date-fns';
import * as log from 'loglevel';
import SearchList from "../searchListUnitEquipment";
import { loadFromDb, unloadInDb, unloadInDbPatch } from "../utils/loader";

log.setLevel('debug');
registerLocale('ru', ru);

function InputRepairForm(props) {
    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');
    const [idEquipment, setIdEquipment] = useState('');
    const [equipment, setEquipment] = useState('')
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [repair, setRepair] = useState([]);
    const [repairCount, setRepairCount] = useState([1]);
    const [materialCount, setMaterialCount] = useState([1]);
    const [material, setMaterial] = useState([]);
    const [idRecord, setIdRecord] = useState('');
    const [sourceRepair, setSourceRepair] = useState([]);
    const [sourceMaterial, setSourceMaterial] = useState([]);
    const [idAuthor, setIdAuthor] = useState('')
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

        const data = {
            dateRepairStart: dateStart,
            dateRepairEnd: dateEnd,
            equipment: idEquipment,
            repair: repair,
            author: localStorage.getItem('userId'),
            material: material,
        };
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment";

        unloadInDb(url, data)
            .then(() => {
                modalClose();
                props.handleAddedRepair(); // для обновление списка ремонтов. 
            })
            .catch(err => {
                    alert('catch==' + JSON.stringify(err));
                    return new Error(err);
            });
    };
    function onClickUpdateRepair() {
        let data = {
            dateRepairStart: dateStart,
            dateRepairEnd: dateEnd,
            equipment: idEquipment,
            repair: repair,
            author: localStorage.getItem('userId'),
            material: material,
        };
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                    "/equipment" + "/" + idRecord;

        unloadInDbPatch(url, data)
            .then(() => {
                modalClose(); // закрыть модальное окно.
                props.handleAddedRepair(); // для обновление списка ремонтов. 
            })
            .catch(err => {
                    alert('catch==' + JSON.stringify(err));
                    return new Error(err);
            });

    };
    function onSelectOptedDateStart(selectedDate) {
        setDateStart(selectedDate);
    };
    function onSelectOptedDateEnd(selectedDate) {
        setDateEnd(selectedDate);
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
                            disabled={!idEquipment}
                            className="m-3 d-grid gap-2" 
                            onClick={onClickAddedRepair}
                        >Создать
                </Button>
            );
        }
    };
    function modalClose() { // может очистку делать этой функцией?
        props.onHide();
        if(props.onLoadRecord) {
            props.resetIdRecord();
        }
        cleanupState();
    };

    function cleanupState() {
        setIdRecord('');
        setIdEquipment('');
        setEquipment('');
        setDateStart('');
        setDateEnd('');
        setAuthor('');
        setIdAuthor('');
 
        setSourceRepair([]);
        setSourceMaterial([]);
 
        setSourceDateEnd('');
        setSourceDateStart('');
 
        setRepairCount([1]);
        setMaterialCount([1]);
 
        setMaterial([]);
        setRepair([]);
 
        setSearchString('');
        setFilter('');
    };

    function AuthorView(modal) {
        if(modal.author) {
            return (
                <p id='textAuthor'>Автор записи: {modal.author}</p>
            )
        } else { return null }
    };


    useEffect(() => {
        if(props.onLoadRecord) {
            let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                     "/equipment/" + props.onLoadRecord);

            loadFromDb(url)
                .then(result => {
                    setIdRecord(result._id);
                    setIdEquipment(result.equipment[0]._id);
                    setEquipment(result.equipment[0].position);

                    setSourceDateStart(result.dateRepairStart);
                    setSourceDateEnd(result.dateRepairEnd);
                    setDateStart(result.dateRepairStart);
                    setDateEnd(result.dateRepairEnd);

                    setSourceRepair(result.repair);
                    const newRepairCount = new Array(result.repair.length);
                    setRepairCount(newRepairCount);


                    setSourceMaterial(result.material);
                    const newMatCount = new Array(result.material.length);
                    setMaterialCount(newMatCount);

                    setAuthor(result.author[0].name);
                    setIdAuthor(result.author[0]._id);
                    
                    // idEquipment есть нужна строка.
                    let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + 
                            "/unit-equipment" + "/" + result.equipment[0]._id);

                    loadFromDb(url).then(result => {
                        let fullName = result.position + " " + result.group;
                        setSearchString(fullName);
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
                cleanupState();
            }
    }, [props.onLoadRecord])


    const { handleAddedRepair, resetIdRecord, onLoadRecord, ...modal} = props;
   
   
   

    return   (    
        <Modal {...modal} 
            backdrop="static"
            dialogClassName='modal-90w'
            size='md'
            fullscreen="md-down"
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            id="modalRepairForm"
        >
            <Modal.Header >
                <Modal.Title >
                    Ввод данных о выполненых работах
                </Modal.Title>
                <button type="button" className="btn-close" id='btnCloseModal' aria-label="Close"
                        onClick={modalClose}

                ></button>
            </Modal.Header>
            <Modal.Body className="show-grid" id='modalRepairForm-body'>
                <Container fluid id='input-module'>
                    <Row>
                        <Col>
                            <label className="setTimeLabel">Время начала</label>
                            <DatePickerDiv type='dateStart' 
                                           onSelectOptedData={onSelectOptedDateStart} setDate={sourceDateStart}/>
                            
                        </Col>
                        <Col>
                            <label className="setTimeLabel">Время окончания</label>
                            <DatePickerDiv type='dateEnd' 
                                            onSelectOptedData={onSelectOptedDateEnd} setDate={sourceDateEnd}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Control 
                                        id='inputEquipmentRepairForm' size="sm" type="text" 
                                        placeholder="Выберите оборудование"
                                        value={searchString}
                                        onChange={onChangeSearch}
                                        idunit={idEquipment}
                                        />
                                    <SearchList filter={filter} onSelectEquipment={handlerSelectEquipment} />    
                                </Col>
                            </Row>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}>
                                <InputGroupButtonSmall name="repair" onHandleRepairCount={() => setRepairCount([...repairCount, 1])} />
                            </Col>

                            <Col>
                                <FormInputRepair    count={repairCount} 
                                                    onHandleRepair={(arr) => setRepair(arr)} 
                                                    onLoadRepair={sourceRepair}
                                                    />
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <FormInputMaterial  count={materialCount} 
                                                    onHandleMaterial={(arr) => setMaterial(arr)} 
                                                    onLoadMaterial={sourceMaterial}
                                                    />
                            </Col>
                            <Col md={1}>
                                <InputGroupButtonSmall name="material" onHandleMaterialCount={() => setMaterialCount([...materialCount, 1])} />
                            </Col>
                        </Row>
                       

                        <Row>
                            <AuthorView author={author} />
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
    let idInput = 'repair';

    if(props.name === "repair") {
        onAddedRecord = () => {
            props.onHandleRepairCount();
        }
    } 
    
    if (props.name === "material") {
       onAddedRecord = () => {
            props.onHandleMaterialCount();
        }

        idInput = 'material';
    }

    return (
        <Button variant="outline-dark" 
                data-toggle="tooltip" 
                className=""
                data-placement="top" 
                title="Добавить запись"
                id={'btnAddDesc_' + idInput}
                onClick={() => onAddedRecord()}
                >+</Button>
    );
};
function DatePickerDiv(props) {
    let currentTime = startOfHour(new Date());
    let idInput = 'inputDateStart';
    const [valueDate, setValueDate] = useState(currentTime);

  
    function handlerOptedData(e) {
        setValueDate(e);    
        props.onSelectOptedData(e);
    };


    if(props.type === 'dateEnd') {
        idInput = 'inputDateEnd';
       
    }


        
    

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
   
        
    

    return (
        <React.Fragment>
            <DatePicker 
                            className="form-control-sm"
                            locale="ru" 
                            selected={valueDate}
                            onChange={(date) => handlerOptedData(date)}
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={30}
                            dateFormat="dd MMMM yyyy HH:mm"
                            id={idInput} />
        </React.Fragment>
    );
};
function FormInputRepair(props) {
    const [count, setCount] = useState([]);
    const [repair, setRepair] = useState([]);
    const [type, setType] = useState([]);

    function onHandleRepair(e, i) {
        let cloneRepair = [...repair];
        cloneRepair[i] = e;
        setRepair(cloneRepair);
        const joinArr = arrJoin(cloneRepair, type);
        props.onHandleRepair(joinArr);
    };
    function onHandleTypeRepair(e, i) {
        let cloneType = [...type];
        cloneType[i] = e;
        setType(cloneType);
        const joinArr = arrJoin(repair, cloneType);
        props.onHandleRepair(joinArr);
    };
    function arrJoin(repairAr, typeAr)  {
        const newArr = repairAr.map((i, a) => {
            return {    description: i,
                        type: typeAr[a] }
        });
        return newArr;
    };


    useEffect(() => {
       setCount([...count, 1]);
       return function cleanup() {
            setCount([]);
        }
    }, [props.count])

    useEffect(() => {
        if(props.onLoadRepair.length) {

           const sourceRepair = props.onLoadRepair.map(i => {
                return i.description;
            });
            setRepair(sourceRepair);

            const sourceType = props.onLoadRepair.map(i => {
                return i.type;
            });
            setType(sourceType);

            let newCount = new Array(props.onLoadRepair.length);
            setCount(newCount);
            props.onHandleRepair(props.onLoadRepair); 
        }
      
        return function cleanup() {
            setCount([1]);
            setRepair([]);
            setType([]);
        }
        
    }, [props.onLoadRepair])
    
    const arrayList = count.map((a, i) => {
            return result(i);
    });
        
    function result(i) {
        return(
            <Row key={"ItemRepairInputForm_"+i}>
                <Col md={3}>
                    <Form.Control   id={'inputTypeRepair_'+i} 
                                    as='select' size="sm" aria-label="Выберите вид работ"
                                    value={type[i] || ''}
                                    onChange={(e) => onHandleTypeRepair(e.target.value, i)}
                                    key={i} >

                            <option value=''> -- select an option -- </option>
                            <option value="CHORES">Хоз.работы</option>
                            <option value="INSPECTION">Осмотр</option>
                            <option value="SERVICE">Обслуживание</option>
                            <option value="REPAIR">Ремонт</option>
                            <option value="RELINING">Перефутеровка</option>
                    </Form.Control>

                </Col>
                <Col>
                    <Form.Control id={'inputRepairDescription_'+i} as='textarea'  
                        placeholder="Что сделано?"
                        key={i} 
                        size="sm" 
                        rows={4}
                        value={repair[i] || ''}
                        onChange={(e) => onHandleRepair(e.target.value, i)}
                    />
                </Col>
            </Row>
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
        const joinArr = arrJoin(cloneMaterial, valueMat);
        props.onHandleMaterial(joinArr);
    };
    function onHandleMaterialVal(e, i) {
        let cloneValue = [...valueMat];
        cloneValue[i] = e;
        setValueMat(cloneValue);
        const joinArr = arrJoin(material, cloneValue);
        props.onHandleMaterial(joinArr);

    };
    function arrJoin(materialAr, valueAr) {
        const newArr = materialAr.map((i, a) => {
            return { name: i,
                     value: valueAr[a]
                    }
        });
        return newArr;
    };
    function onHandleNumberInput(event) {
        if (!/\d/.test(String.fromCharCode(event.charCode)) &&
            event.charCode > 9 &&
            !event.ctrlKey){  //event.ctrlKey не срабатывает.
                event.preventDefault();
        }
    }


    useEffect(() => {
        setCount([...count, 1]);
        return function cleanup() {
            setCount([]);
        }
        
    }, [props.count])

    useEffect(() => {
        if(props.onLoadMaterial.length) {
            const sourceMaterial = props.onLoadMaterial.map(i => {
                return i.name;
            });
            setMaterial(sourceMaterial);
            const sourceValue = props.onLoadMaterial.map(i => {
                return i.value;
            });
            setValueMat(sourceValue);

            let newCount = new Array(props.onLoadMaterial.length);
            setCount(newCount);

            props.onHandleMaterial(props.onLoadMaterial);
        }

        return function cleanup() {
            setCount([]);
            setMaterial([]);
            setValueMat([]);
        }
    }, [props.onLoadMaterial])


    
    function result(i) {
        return (
            <Row key={'inputMaterialForm' + i}>
                <Col>
                    <Form.Control id={'inputMaterialName_' +i} size="sm" type="text" 

                    placeholder="Введите материал"
                    key={i}
                    value={material[i] || ''}
                    onChange={(e) => onHandleMaterial(e.target.value, i)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control id={'inputMaterialVal_'+i}  size="sm" type="text"  
                    placeholder="Введите его количество"
                    key={i}
                    value={valueMat[i] || ''}
                    onKeyPress={(event) => onHandleNumberInput(event)}
                    onChange={(e) => onHandleMaterialVal(e.target.value, i)}
                    />
                </Col>
            </Row>
            )
        };

    const arrayList = count.map((a, i) => {
        return result(i);
    });
    
    return (
        <React.Fragment>
            {arrayList}
        </React.Fragment>
    )
};