import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';
import {format, parseISO } from 'date-fns';
import * as log from 'loglevel';
import * as _ from 'lodash';
import InputBidRequestForm from "./inputBidRequestForm";
import { loadFromDb } from "../utils/loader";
import { statusBidList } from "./selectField";

log.setLevel('debug');


function  ReadListBidRequest(props) {
    const [listBidRequest, setListBidRequest] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [idRecord, setIdRecord] = useState('');
    const [addedRecord, setAddedRecord] = useState([]);

    const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest");

    url.searchParams.set("id", localStorage.getItem('userId'));
        

    if (props.statusBid) {
        url.searchParams.set("statusBid", props.statusBid);
    }
    if (props.category) {
        url.searchParams.set('category', props.category);
    }
    if (props.priority) {
        url.searchParams.set('priority', props.priority);

    }
    if (props.onSearchDescription) {
        url.searchParams.set('description', props.onSearchDescription)
    }

    useEffect(() => {
      
        loadFromDb(url)
            .then(queryFromDb => {
                    setListBidRequest(queryFromDb);
                    setIsLoaded(true);
            })
            .catch(err => {
                setIsLoaded(false)
                log.debug('response server is error' + err);
                alert(err);
      });

    }, [
        props.addedRecord, 
        addedRecord, 
        props.category, 
        props.statusBid, 
        props.priority, 
        props.onSearchDescription]);
  
  

    if (!isLoaded || !listBidRequest) {
      return <div>Нет заявок</div> 
    } else {
        return (
            <React.Fragment>
                <InputBidRequestForm    show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        onLoadRecord={idRecord}
                                        resetIdRecord={() => setIdRecord('')}
                                        handleAddedRecord={() => setAddedRecord([...addedRecord, 1])}
                />

                <Table id='tableBidRequest' responsive='mg' bordered hover>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th className="col-2">Описание заявки</th>
                            <th>Статус заявки</th>
                            <th>Дата изм. статуса</th>
                            <th>Автор изменений</th>

                            <th>Категория</th>
                            <th>Приоритет</th>
                            
                            <th>Дата создания</th>
                            <th>Автор</th>
                            <th>Комментарий</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBidRequest.map((i) => {
                            return (
                                    <ReadModuleBlock    key={i._id} 
                                                        i={i}  
                                                        onOpenRecord={() => setIdRecord(i._id)}
                                                        onModalShow={() => setModalShow(true)}
                                    /> 
                            );
                        })
                        }
                            
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }
};
export default ReadListBidRequest;



function ReadModuleBlock(props) {

    let { onOpenRecord, onModalShow, ...customProps } = props;
   
    customProps = customProps.i;

    function onBidRequestEdit() {
        props.onModalShow();
        props.onOpenRecord();
    }
    function DateStatusBidView(customProps) {
        if(customProps.dateStatusBid) {
            return (
                <td>{format(parseISO(customProps.dateStatusBid), 'dd-MM-yyyy HH:mm')}</td>
            )
        } else {
            return (<td></td>)
        }
    };
    function DateCreatedView(customProps) {
        if(customProps.dateCreated) {
            return (
                <td>   { format(parseISO(customProps.dateCreated), 'dd-MM-yyyy HH:mm') }</td>
            )
        } else {
            return ( <td></td>)
        }
    };
    function LastAuthorView(customProps) {

        if(customProps.lastAuthor.length) {
            return (
                <td>{customProps.lastAuthor[0].name}</td>
            )
        } else {
            return (<td></td>)
        }
    };
    
    return (
        <tr key={customProps._id}>
            <td>
                <Button variant="outline-dark" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Редактировать"
                        id='EditBidRequest'
                        onClick={() => onBidRequestEdit()}
                        >
                            <TiPen />
                        </Button>
            </td>
            <td>{customProps.description}</td>
            <td>{statusBidList.get(customProps.statusBid)}</td>
            <DateStatusBidView dateStatusBid={customProps.dateStatusBid} />
            <LastAuthorView lastAuthor={customProps.lastAuthor} />
            <td>{customProps.category}</td>
            <td>{customProps.priority}</td>    
            <DateCreatedView dateCreated={customProps.dateCreated} />
            <td>{customProps.author[0].name}</td>
            <td>{customProps.comment}</td>
        </tr>
    )
};