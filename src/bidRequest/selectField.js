import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';


const statusBidList = new Map([
    ["DRAFT", 'Черновик'],
    ["CANCELLED", 'Отменено'],
    ["FINISHED", 'Завершено'],
    ["DEFERRED", 'Отложено'],
    ["INWORK", 'В работе'],
    ["NEW", 'Новая']
]);
            /* TODO Заказано, отправлено, согласование ... */


export {statusBidList};




function StatusSelectField(props) {

    function handleStatusSelect(e) {
        props.handleStatus(e);
    }
    
    return (
        <Form.Control as='select' size="sm" aria-label="Выберите статус заявки"
            value={props.statusBid} id='filterSelectStatusBid'
            onChange={(e) => handleStatusSelect(e.target.value)}  >
                
            <option value=''>Выберите статус</option>
            <option value="DRAFT">{statusBidList.get('DRAFT')}</option>
            <option value="CANCELLED">{statusBidList.get('CANCELLED')}</option>
            <option value="FINISHED">{statusBidList.get('FINISHED')}</option>
            <option value="DEFERRED">{statusBidList.get('DEFERRED')}</option>
            <option value="INWORK">{statusBidList.get('INWORK')}</option>
            <option value="NEW">{statusBidList.get('NEW')}</option>
            {/* Заказано, отправлено, согласование ... */}

        </Form.Control>  
    );

};
export {StatusSelectField}; 


function CategorySelectField(props) {

    function handleCategorySelect(e) {
        props.handleCategory(e);
    }

    return (
        <Form.Control   as="select" 
                        size="sm" 
                        aria-label="Выберите категорию"
                        value={props.category}
                        onChange = { (e) => handleCategorySelect(e.target.value)}
                        placeholder="Выберите категорию"
                        id='filterSelectCategoryBid'>

                        <option value='' >Выберите категорию</option>
                        <option value="Инструмент">Инструмент</option>
                        <option value="Расходники">Расходники</option>
                        <option value="Запчасти">Запчасти</option>
                        <option value="Прочее">Прочее</option>
                    </Form.Control>
    )
};
export {CategorySelectField};

function PrioritySelectField(props) {
  
    function handlePrioritySelect(e) {
        props.handlePriority(e);
    }

    return (
            <Form.Control   as="select" size="sm" 
                            aria-label="Выберите приоритет"
                            id='filterSelectPriorityBid'
                            onChange={(e) => handlePrioritySelect(e.target.value)}
                            value={props.priority} >

                <option value=''>Выберите приоритет</option>
                <option value="Срочно">Срочно!</option>
                <option value="Планово">Планово</option>
                <option value="Желательно">Желательно</option>
            </Form.Control>
    )

};
export {PrioritySelectField};
