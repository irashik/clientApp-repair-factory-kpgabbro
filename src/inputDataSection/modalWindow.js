
import React, { useEffect, useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalHeader from 'react-bootstrap/ModalHeader'


import Form from 'react-bootstrap/Form';
import { TiPen } from 'react-icons/ti';
import DatePicker, { registerLocale, setDefaultLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDebouncedCallback } from 'use-debounce';

import ru from 'date-fns/locale/ru';
import {format, getMonth} from 'date-fns';

registerLocale('ru', ru);

//import SearchList from "./searchList";

import * as log from 'loglevel';
log.setLevel('debug');

import jQuery from 'jquery';

import InputModule from './inputRepairForm';




function InsertDataModal(props) {



    return (
      <Modal {...props} 
            
            size="xl"
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter">

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Using Grid in Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">

        <InputModule props={props} />




          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  export default InsertDataModal;
