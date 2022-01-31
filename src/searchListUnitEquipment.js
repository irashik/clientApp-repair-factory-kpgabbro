import React, { useState, useEffect }  from "react";
import * as log from 'loglevel';
import { loadFromDb } from './utils/loader';

log.setLevel('debug');


function SearchList(props) {
    const [filteredList, setFilteredList] = useState([]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(false);
        const url = new URL (process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment");

        if(props.filter) {
            url.searchParams.set("search", props.filter);

            loadFromDb(url)
                .then(queryFromDb => {
                    const preparedList = makeKeyListEquipment(queryFromDb);
                    setFilteredList(preparedList);
            })
            .catch(e => {
                throw new Error('error in server = ' + e);
            })
        }

    }, [props.filter]);

    function handleEventClick(id, joinNameUnit) {
        props.onSelectEquipment(id, joinNameUnit);
        setSelected(true);
    }

    
    if(!props.filter) { return null };

    if (!filteredList.length && props) {
        return(
            <div className="list-group"> 
                <li className="list-group-item list-group-item-warning ">Нет совпадений</li>
            </div>
        )
    } else {

        const listItems = filteredList.map((item) => {
            const id = item._id;
            const joinNameUnit = item.mergedData;

           return  <a   
                        className="list-group-item list-group-item-action"
                        key={id}
                        id="filteredListUnitEquipment"
                        onClick={() => handleEventClick(id, joinNameUnit)}
                        >
                    { joinNameUnit }
                    </a>
        });


        function ResultList(props) {
            if(!props.selected) {
                return (
                    <div className="list-group"> 
                        { listItems }
                    </div>
                );
            } else {
                return null;
            }
        };

        return (
            <ResultList selected={selected} />
        );
    }
};
export default SearchList;


function makeKeyListEquipment(sourceArray) {
    let newArray = sourceArray.map(currentValue => {
        const id = currentValue._id;
        const mergedData = currentValue.position.concat("; ", currentValue.group, "; (", currentValue.name, ")");
        const resultObject = { "_id": id, "mergedData": mergedData }
        return resultObject
    });
    return newArray
};


