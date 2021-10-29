/*
модуль делающий запрос к базе по еденицам оборудования и осуществляющем поиск.

todo нужно немного доработать поиск. 
Задача: ввел данные - нашлись релевантные позиции , не исчезают.

*/


import React, { useState, useEffect }  from "react";
import Fuse from 'fuse.js';
import { loadFromDb } from "./utils/loader";


function SearchList(props) {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [timer, setTimer] = useState(true);

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment";

    useEffect(() => {
        if(props.filter) {
            loadFromDb(url)
                .then(queryFromDb => {
                    const preparedList = makeKeyListEquipment(queryFromDb);
                    setList(preparedList);

                    const filter_result_list = setFuseFilterList(list, props.filter);
                    const adaptation_filter_list = adaptationFilterList(filter_result_list);
                    setFilteredList(adaptation_filter_list);

            })
            .catch(e => {
                throw new Error('error in server = ' + e);
            })
        }

        // return function cleanup() {
        //     // setList([]);
        //     // setFilteredList([]);
        //     //setTimer(true);

        // }

    }, [props.filter]);
  
    //todo const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

   



    useEffect(() => {
        setTimer(true);

        setTimeout(() => {
            setTimer(false);
        }, 3500);
        

    }, [filteredList])

    
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
                        onClick={props.onSelectEquipment.bind(null, id, joinNameUnit)}
                        >
                    { joinNameUnit }
                    </a>
        });

                      


        

        function ResultList(props) {
            if(props.timer) {
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
            <ResultList timer={timer} />
        );
    }
};
export default SearchList;



function setFuseFilterList(list, searchString) {

    const searchOptions = keys => ({
        souldSort: true,
        threshold: 0.4,
        maxPatternLength: 20, 
        minMatchCharLength: 1,
        isCaseSensitive: false,
        includeScore: true,
        findAllMatches: true,

        keys: [...keys]
    });

    if (!searchString) {
        return [];
    }

    const fuse = new Fuse(list, searchOptions(["mergedData"]));
    let searchResult = fuse.search(searchString);
    return searchResult;
};



// todo хочу чтобы записывал данные в локальное хранилище, чтобы постоянно к базе не обращаться
// периодичность обновления?
 //             window.localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
    //     const initialState = window.localStorage.getItem('resultKeyListEquipment');






function makeKeyListEquipment(sourceArray) {
    let newArray = sourceArray.map(currentValue => {
        const id = currentValue._id;
        const mergedData = currentValue.position.concat(" ", currentValue.group, " (", currentValue.name, ")");
        const resultObject = { "_id": id, "mergedData": mergedData }
        return resultObject
    });
    return newArray
};

function adaptationFilterList(sourceFilteredList) {
    
    if(!sourceFilteredList.length) {
        return [];
    } else {
        let result_array = sourceFilteredList.map(i => {
            const id = i.item._id;
            const md = i.item.mergedData;
            const result_i = { 
                    "_id": id, 
                    "mergedData": md }
                    return result_i;
            });
        return result_array;
    }
};