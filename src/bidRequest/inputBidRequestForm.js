import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import log from 'loglevel';
import { format, parseISO } from 'date-fns';

import {StatusSelectField, CategorySelectField, PrioritySelectField } from "./selectField";
import { loadFromDb, unloadInDb, unloadInDbPatch } from "../utils/loader";

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
        
        let data = {
            dateCreated: new Date(),
            description: description,
            statusBid: statusBid,
            dateStatusBid: new Date (),
            priority: priority,
            author: window.localStorage.getItem('userId'),
            category: category,
            comment: comment
        }
        const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest");
        
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
                alert('error from server = ' + JSON.stringify(err));
                
                throw new Error('ошибка от сервера==', JSON.stringify(err));
                

                // todo нужно пробрасывать ошибку от сервера.
            });
    };
    function onClickUpdateRecord() {
        
        let data = {
            description: description,
            statusBid: statusBid,
            dateStatusBid: new Date(),
            lastAuthro: lastAuthor,
            lastAuthor:  window.localStorage.getItem('userId'),
            priority: priority,
            category: category,
            comment: comment,
        };
       
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest/" + idRecord;

        unloadInDbPatch(url, data)
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
                    setAuthor(result.author[0].name);
                    if(result.lastAuthor.length) {
                        setLastAuthor(result.lastAuthor[0].name);
                    }
                    setCategory(result.category);
                    setIdRecord(result._id);
                   
                })
                .catch(e => {
                    throw new Error(e);
                })
        }
    
        return function cleanup() {
            if (props.onLoadRecord) {
                props.resetIdRecord();
            }
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

    }, [props.onLoadRecord, props.handleAddedRecord]);


    
    
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
    function AuthorView(props) {
        if(props.author) {
            return (<p>Автор записи: {props.author}</p>)
        } else { return(null) }
    };
    function LastAuthorView(props) {
        if(props.lastAuthor) {
            return (<p>Автор последней записи: {props.lastAuthor}</p>)
        } else { return(null) }
    };
    function BtnView(props) {
        if(props.onLoadRecord) {
            return (
                <Button variant="primary"    
                            id="UpdateBidBtn"
                            className="m-3 d-grid gap-2" 
                            onClick={onClickUpdateRecord}
                        >Обновить
                </Button>
            );
        } else {
            return (
                <Button variant="primary"    
                            id="CreateBidBtn"
                            className="m-3 d-grid gap-2" 
                            onClick={onClickAddedRecord}
                        >Создать
                </Button>
            );
        }
    };


    return(    
        <Modal {...modal} 
            backdrop="static"
            dialogClassName='modal-90w'
            size='lg'
            fullscreen="xl-down"
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            id={idRecord}
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