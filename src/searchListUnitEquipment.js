import React, { useState, useEffect }  from "react";
import Fuse from 'fuse.js';


function SearchList(props) {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [timer, setTimer] = useState(true);

    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment";

    useEffect(() => {
        fetchListFromDb(url).then(queryFromDb => {
            const preparedList = makeKeyListEquipment(queryFromDb);
            setList(preparedList);
        })
    }, [props.filter]);
  
    //todo const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

    useEffect(() => {
        const filter_result_list = setFuseFilterList(list, props.filter);
        const adaptation_filter_list = adaptationFilterList(filter_result_list);
        setFilteredList(adaptation_filter_list);
    }, [props.filter]);



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
                        id_unit={id}
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
        threshold: 0.6,
        distance: 100,
        maxPatternLength: 32, 
        minMatchCharLength: 2,
        keys: [...keys]
    });

    if (!searchString) {
        return [];
    }

    const fuse = new Fuse(list, searchOptions(["mergedData"]));
    let searchResult = fuse.search(searchString);
    return searchResult;
};



// хочу чтобы записывал данные в локальное хранилище, чтобы постоянно к базе не обращаться
// периодичность обновления?
 //             window.localStorage.setItem("resultKeyListEquipment", resultKeyListEquipment);
    //     const initialState = window.localStorage.getItem('resultKeyListEquipment');

async function fetchListFromDb(url) {

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentialls: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
      };

    const res = await fetch(url, options);
    return res.json();
};

function makeKeyListEquipment(sourceArray) {
    let newArray = sourceArray.map(currentValue => {
        const id = currentValue._id;
        const mergedData = currentValue.name.concat(", ", currentValue.position, ", ", currentValue.group);
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