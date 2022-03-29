/*
* модуль построитель запросов к базе данных
*  при вызове загрузчиков следующ алгоритм:
*    Проверка наличия токена
*    если ок, то запрос к базе данных
*    если нет , то обновление по ревреш токену и еще один запрос.
*/

import * as log from 'loglevel';

log.setLevel('debug');



class Loader {
  constructor(url, method, data, accessToken, refreshToken) {
    
    this.url = url,
    this.method =  method,
    this.data = data,
    this.refreshToken = refreshToken,
    this.accessToken = accessToken

    this.tokenstr = "Bearer " + this.accessToken,

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

function checkTokenAndUpdate(refreshToken) {
  return new Promise((resolve, reject) => {
      const url = new URL(process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/refresh-token");
      const loader = new Loader(url, "GET", null, null, refreshToken);
      const resAuthServer = fetch(loader.url, loader.refOptions);

      resAuthServer
      .then(res => {
          if (res.status == 401) {
            throw new Error('Unauthorized - invalid refreshToken');
            //todo как пробросить ошибку далее

          } else if (res.status == 200) {
            return res.json();
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
};


function loadFromDb(url) {
  return new Promise((resolve, reject) => {
    const accesstoken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accesstoken) {
      const url = process.env.HTTP_CLIENT_HOST + ":" + process.env.HTTP_CLIENT_PORT + "/auth";

      window.location = url;
      reject(new Error('Not found accessToken'));
      //todo нужно как-то пробросить ошибку и показать в сообщении.
    }
  
    const loaderLoad = new Loader(url, "GET", null, accesstoken, refreshToken);
    const responseDb = fetch(loaderLoad.url, loaderLoad.options);

    responseDb
    .then(res => {
        if(res.status == 401) { //UNAUTHORIZED
          /* тогда делаем запрос на обновление токена
          сохраняем токены полученные
          делаем запрос еще раз
          если ок то продолжить...
          если нет то ошибку 
          */

          const newTokens = checkTokenAndUpdate(refreshToken);    
          
          newTokens
          .then(newTokensRes => {
            localStorage.setItem('accessToken', newTokensRes.accessToken);
            localStorage.setItem('refreshToken', newTokensRes.refreshToken);
            
            // еще раз делаем запрос на получение данных
            const loader = new Loader(url, "GET", null, newTokensRes.accessToken, null);
            const requestInDb = fetch(loader.url, loader.options);
    
            requestInDb
              .then(newres => {
                if(newres.status == 401) {
                  throw new Error ('UNAUTHORIZED');
                } else if (newres.status === 201 || newres.status == 200 || res.status == 304) {
                  return newres.json();
                } else {
                  reject (new Error(newres));
                }
              })
              .catch(err => {
                reject(new Error(err));
              });
          })
          .catch(err => {
            reject(new Error('server not return tokens' + err));
          });
        

          

        }
        else if (res.status == 200 || res.status == 201 || res.status == 304) {
            return res.json();
        } else {
            reject(new Error(res));
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
export { loadFromDb };


function unloadInDb(url, data) {
  return new Promise((resolve, reject) => {

    const accesstoken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const loaderUnload = new Loader(url, "POST", data, accesstoken, refreshToken);
    const responseDb = fetch(loaderUnload.url, loaderUnload.options);

    responseDb
      .then(res => {
        if (res.status == 401) { //Unauthorized
          throw new Error('UNAUTHORIZED');
          // todo здесь желательно выполнить один цикл по обновлению токена.



        } else if (res.status == 400 || res.status == 403) {
          throw new Error ('bad request' + res.json());
        
        } else if (res.status === 201 || res.status == 200) {
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


function unloadInDbPatch(url, data) {
  return new Promise((resolve, reject) => {

    const accesstoken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accesstoken) {
        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/auth/login"
      window.location = url;
      reject(new Error('Not found accessToken'));
    }

    const loaderUnload = new Loader(url, "PATCH", data, accesstoken, refreshToken);
    const responseDb = fetch(loaderUnload.url, loaderUnload.options);

    responseDb
      .then(res => {
        if (res.status == 401) { //Unauthorized
     
          

          throw new Error('UNAUTHORIZED');
          





        } else if (res.status ===  200 || res.status == 204 || res.status == 201) {
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
export { unloadInDbPatch };
          