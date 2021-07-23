import React, { useState, useEffect }  from "react";
import Fuse from 'fuse';

const searchOptions = keys => ({
    souldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32, 
    minMatchCharLength: 1,
    keys: [...keys]
});

const filterList = (list, filter) => {
    if (!filter) return list;

    const fuse = new Fuse(list, searchOptions(['body']));
    const result = fuse.search(filter);

    return result;
};


const fetchList = async url => {
    const res = await fetch(url, options);

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

    return await res.json();
}


function SearchList(filter) {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/unit-equipment";


    useEffect(() => {
        fetchList(url).then(data => setList(data));
    }, [url]);

    


    useEffect(() => {
        setFilteredList(filterList(list, filter));

    }, [filter, list]);

    return (
        <ul>
            {filteredList.map(item => {
                <li key={item._id}>{it.mergedData}</li>
            })}
        </ul>
    );


};


export default SearchList;

