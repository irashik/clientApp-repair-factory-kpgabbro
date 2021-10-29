
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


import * as log from 'loglevel';
import {eachQuarterOfInterval, format, parseISO } from 'date-fns';


import {StatusSelectField, CategorySelectField, PrioritySelectField } from "./selectField";
import { loadFromDb, unloadInDb, unloadInDbPatсh } from "../utils/loader";

log.setLevel('debug');


function InputBidRequestForm(props) {

    const [idRecord, setIdRecord] = useState('');
    const [description, setDescription] = useState('');
    const [statusBid, setStatusBid] = useState('DRAFT');
    const [priority, setPriority] = useState('');
    const [comment, setComment] = useState('');
    const [category, setCategory] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [dateStatusBid, setDateStatusBid] = useState('');
    const [lastAuthor, setLastAuthor] = useState('');
    const [author, setAuthor] = useState('');

    
    function onClickAddedRecord() {
        const dateCreated = new Date();
        let data = {
            dateCreated: dateCreated,
            description: description,
            statusBid: statusBid,
            //dateStatusBid: 
            // lastAuthor: 
            priority: priority,
            author: localStorage.getItem('userId'),
            category: category,
            comment: comment,
        }
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest";
        unloadInDb(url, data)
            .then(result => {
                setIdRecord('');
                setDescription('');
                setStatusBid('DRAFT');
                setPriority('');
                setComment('');
                setCategory('');
                setDateCreated('');
                setDateStatusBid('');

                //todo toast message add ?
                props.onHide();
                props.handleAddedRecord();

            })
            .catch(err => {
                alert('error from server = ' + err);
                
                throw new Error('ошибка от сервера==', err);
                

                // todo нужно пробрасывать ошибку от сервера.
            });
    };

    function onClickUpdateRecord() {
        const dateStatusBid = new Date();
        let data = {
            description: description,
            statusBid: statusBid,
            dateStatusBid: dateStatusBid,
            lastAuthor:  localStorage.getItem('userId'),
            priority: priority,
            category: category,
            comment: comment,
        }
       
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest/" + idRecord;
        unloadInDbPatсh(url, data)
            .then(result => {
                try{
                    setIdRecord('');
                    setDescription('');
                    setStatusBid('DRAFT');
                    setPriority('');
                    setComment('');
                    setCategory('');
                    
                    setLastAuthor('');
                    setDateStatusBid('');

                    props.handleAddedRecord();
                    props.onHide();
    
                }
                catch(e) {
                    throw new Error('error=', e);
                }


            })
            .catch(err => {
                throw new Error('какая-то ошибка', err);
            })
    };

    const { handleAddedRecord, onLoadRecord, resetIdRecord, ...modal} = props; // исключаю пропсы функции

    
    

    useEffect(() => {

        if(props.onLoadRecord) {
            let url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT +
                     "/bidrequest/" + props.onLoadRecord);

            loadFromDb(url)
                .then(result => {
                    setDescription(result.description);
                    setStatusBid(result.statusBid);
                    setComment(result.comment);
                    setDateCreated(result.dateCreated);
                    setDateStatusBid(result.dateStatusBid);
                    setPriority(result.priority);
                    setAuthor(result.author);
                    setLastAuthor(result.lastAuthor);
                    setCategory(result.category);
                    setIdRecord(result._id);
                   
                })
                .catch(e => {
                    log.debug('error= ' + e);
                    throw new Error(e);
                })
        }
    
        return function cleanup() {
            setDescription('');
            setStatusBid('DRAFT');
            setComment('');
            setDateCreated('');
            setDateStatusBid('');
            setPriority('');
            setAuthor('');
            setLastAuthor('');
            setCategory('');
            //setIdRecord('');
            
        }

    }, [props.onLoadRecord]);


    
    
    function DateCreatedView(modal) {
        if(modal.dateCreated) {
            return (
                <p>Дата создания записи: {format(parseISO(modal.dateCreated), 'dd-MM-yyyy') }</p>
            )
        } else { 
            return (null) }
    };

    function DateStatusBidView(modal) {
        if(modal.dateStatusBid) {
            return (
                <p>Дата изменения статуса: {format(parseISO(modal.dateStatusBid), 'dd-MM-yyyy HH:mm')}</p>
            )
        } else { return(null) }
    };

    function AuthorView(modal) {
        if(modal.author) {
            return (
        <p>Автор записи: {modal.author}</p>
            )
        } else { return(null) }
    };

    function LastAuthorView(modal) {
        if(modal.lastAuthor) {
            return (
        <p>Автор последней записи: {modal.LastAuthor}</p>
            )
        } else { return(null) }
    };

    function BtnView(props) {
        // todo тут просто через пропы передается id author т.к. он появляется при редактировании.
        
        if(props.onLoadRecord) {
            return (
                <Button variant="primary"    
                            id="UpdatePlanbtn"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickUpdateRecord()}
                        >Обновить
                </Button>
            ) ;
        } else {
            return (
                <Button variant="primary"    
                            id="CreatePlanbtn"
                            className="m-3 d-grid gap-2" 
                            onClick={() => onClickAddedRecord()}
                        >Создать
                </Button>
            );
        }
    }




    return(    
        <Modal {...modal} 
            backdrop="static"
            dialogClassName='modal-fullscreen'
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            key={idRecord}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Форма ввода заявки
                </Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={props.onHide}

                ></button>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container fluid id='input-module'>
                    <Row>
                        <Form.Control   id='createBid' as='textarea' className="m-0" rows={3} 
                                    placeholder="Опишите заявку (Что нужно, сколько)" 
                                    value= {description}
                                    onChange = { (e) => setDescription(e.target.value)}
                        />
                    </Row>
                    <Row>
                        <label>Текущий статус заявки</label>
                        <StatusSelectField statusBid={statusBid} handleStatus={(e) => setStatusBid(e)} />
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <CategorySelectField category={category} handleCategory={(e) => setCategory(e)} />
                        </Col>

                        <Col sm={4}>
                            <PrioritySelectField priority={priority} handlePriority={(e) => setPriority(e)}/>
                        </Col>
                    </Row>
                  
                      
                  
                    <Row>
                        <Form.Control id='inputComment' size="sm" as="textarea" rows={3} 
                                        placeholder="Примечание"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        />
                    </Row>
                  

                    <Row>
                        <DateCreatedView dateCreated={dateCreated}/>
                        <DateStatusBidView dateStatusBid={dateStatusBid} />
                        <AuthorView author={author} />
                        <LastAuthorView lastAuthor={lastAuthor} />

                    </Row>

                </Container>

            </Modal.Body>
            <Modal.Footer>
                <BtnView onLoadRecord={idRecord} />


            </Modal.Footer>
        </Modal>        
    )
};
export default InputBidRequestForm;