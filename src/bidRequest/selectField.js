import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function StatusSelectField(props) {

    function handleStatusSelect(e) {
        props.handleStatus(e);
    }
    
    return (
        <Form.Control as='select' size="sm" aria-label="Выберите статус заявки"
            value={props.statusBid} id='filterSelectStatusBid'
            onChange={(e) => handleStatusSelect(e.target.value)}  >
                
            <option value=''>Выберите статус</option>
            <option value="DRAFT">Черновик</option>
            <option value="CANCELLED">Отменено</option>
            <option value="FINISHED">Завершено</option>
            <option value="DEFERRED">Отложено</option>
            <option value="INWORK">В работе</option>
            <option value="NEW">Новая</option>
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
