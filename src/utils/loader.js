// модуль построитель запросов к базе данных
// плюс обработка токенов.


/*
  при вызове загрузчиков следующ алгоритм:
    Проверка наличия токена

*/

import * as log from 'loglevel';
log.setLevel('debug');
//import fetch from 'node-fetch';
//globalThis.fetch = fetch;


//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//const accesstoken = localStorage.getItem('accessToken');
//const refreshToken = localStorage.getItem('refreshToken');


class Loader {
 
  constructor(url, method, data, accessToken, refreshToken) {
    this.url = url,
    this.method =  method,
    this.data = data,

    this.refreshToken = refreshToken,
    this.accessToken = accessToken

    this.tokenstr = "Bearer " + this.accesstoken,
    
    this.refOptions = {
      method: "GET",
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'refreshToken': this.refreshToken
      },
      redirect: 'follow'
    }


    this.options = {
      method: this.method,
      mode: 'cors',
      cache: 'no-cache',
      credentialls: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.tokenstr
      },
      redirect: 'follow',
    }


    if(this.data) {
      const body = JSON.stringify(this.data);
      this.options.body = body;
    }

  }
};
export { Loader };

  



  function checkTokenAndUpdate() {
    return new Promise((resolve, reject) => {

        const url_ref = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/refresh-token"
    
          

        fetch(url_ref, this.refOptions)
          .then(res => {
            if (res.status === 401) {
              throw new Error('Unauthorized - invalid refreshToken');

            } else if (res.status === 200) {
              return res.json()
            } else {
              reject(new Error(res));
            }
          })
          .then(newTokens => {
              resolve(newTokens);
          })
          .catch(err => {
            reject(new Error(err));
          })
       });
  }




function loadFromDb(url) {
  return new Promise((resolve, reject) => {
    const accesstoken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accesstoken) {
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/login";
      //window.location = url;
      reject(new Error('Not found accessToken'));
    }
  
    const loaderLoad = new Loader(url, "GET", null, accesstoken, refreshToken);
    const responseDb = fetch(loaderLoad.url, loaderLoad.options);

    responseDb
    .then(res => {
        if(res.status === 401) { //UNAUTHORIZED
            throw new Error('UNAUTHORIZED');
        }
        if (res.status === 200 || 201) {
            return res.json()
        } else {
            reject(new Error(res));
        }
        })
        .then(result => {
            resolve(result);
        })
        // .catch(err => {
        //   reject(new Error(err));
        // });
      });
};
export { loadFromDb };





function unloadInDb(url, data) {
  return new Promise((resolve, reject) => {

    const accesstoken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accesstoken) {
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/login"
      //window.location = url;
      reject(new Error('Not found accessToken'));
    }

    const loaderUnload = new Loader(url, "POST", data, accesstoken, refreshToken);
    
    const responseDb = fetch(loaderUnload.url, loaderUnload.options);

    responseDb
      .then(res => {
        if (res.status === 401) { //Unauthorized
          
          throw new Error('UNAUTHORIZED');


          // здесь нужно выполнить один цикл по обновлению токена.




        } else if (res.status === 201 || 200) {
          return res.json()
        } else {
          reject (new Error(res));
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(new Error(err));
      });
  });
};
export { unloadInDb };



    // сохраняем данные в localStorage

 //   localStorage.setItem('accessToken', newTokens.accessToken);
  //  localStorage.setItem('refreshToken', newTokens.refreshToken);
    

    // делаем изначальный запрос еще раз.


