
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import { TiPen } from 'react-icons/ti';

import {format, parseISO } from 'date-fns';



import InputBidRequestForm from "./inputBidRequestForm";
import { loadFromDb } from "../utils/loader";

import * as log from 'loglevel';
import * as _ from 'lodash';


log.setLevel('debug');





function  ReadListBidRequest(props) {
    const [listBidRequest, setListBidRequest] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [idRecord, setIdRecord] = useState('');
    const [addedRecord, setAddedRecord] = useState([]);



    useEffect(() => {
    
        const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/bidrequest");
        
        // if(props.category || props.statusBid || props.priority == null) {

        //     let filter = `{ "statusBid": {"$ne": "FINISHED"}}`; // изначально все кроме выполненных
        

        //     url.searchParams.set("filter", filter );

        // }

        if (props.statusBid) {
            url.searchParams.set("statusBid", props.statusBid);
        }
        if (props.category) {
            url.searchParams.set('category', props.category);
        }
        if (props.priority) {
            url.searchParams.set('priority', props.priority);

        }

        loadFromDb(url)
            .then(queryFromDb => {
                    setListBidRequest(queryFromDb);


                    setIsLoaded(true);
      });

    }, [props.addedRecord, addedRecord, props.category, props.statusBid, props.priority]);
  
  

    if (!listBidRequest.length) {
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
}
export default ReadListBidRequest;






function ReadModuleBlock(props) {


    function onBidRequestEdit() {
        props.onModalShow();
        props.onOpenRecord();
    }

    let { onOpenRecord, onModalShow, ...customProps } = props;
    
    customProps = customProps.i;

    
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

    return (
        <tr key={customProps._id}>
            <td>
                <Button variant="outline-dark" 
                        data-toggle="tooltip" 
                        data-placement="top" 
                        title="Редактировать"
                        id='EditPlanRepair'
                        onClick={() => onBidRequestEdit()}
                        >
                            <TiPen />
                        </Button>
            </td>
            <td>{customProps.description}</td>
            <td>{customProps.statusBid}</td>
            <DateStatusBidView dateStatusBid={customProps.dateStatusBid} />
            <td>{customProps.lastAuthor}</td>
            <td>{customProps.category}</td>
            <td>{customProps.priority}</td>    
         
            <DateCreatedView dateCreated={customProps.dateCreated} />

            <td>{customProps.author}</td>
            <td>{customProps.comment}</td>
        </tr>
    )
};