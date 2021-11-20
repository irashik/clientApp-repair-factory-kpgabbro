//testing loader.spec.js

import { Loader, testFunc, unloadInDb, customFetch } from "./loader";
import React from 'react';
import { shallow, render } from 'enzyme';


import renderer from 'react-test-renderer';
import * as log from 'loglevel';
log.setLevel('debug');
import localStorage from './__mocks__/localstorageMock';
window.localStorage = localStorage;

//import fetch from 'node-fetch';



describe.skip("testing loader.js", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test('module run correctly', () => {

        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment";

        const data = {
            'repair': 'testing',
            'author': 'test'
        }

        localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJlbWFpbCI6InRlc3QzQHRlc3QucnUiLCJzdWIiOiI2MGFhNzYzNzc1OTE2YmRlZjgwMmIwYzQiLCJpYXQiOjE2MzQ3OTAzMDMsImV4cCI6MTYzNDc5MDkwM30.GSNF4mWLs99YOFpHU4wqxTWFYBHJraDXpnAy2SO_iSg' );

        let a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJlbWFpbCI6InRlc3QzQHRlc3QucnUiLCJzdWIiOiI2MGFhNzYzNzc1OTE2YmRlZjgwMmIwYzQiLCJpYXQiOjE2MzQ3OTAzMDMsImV4cCI6MTYzNDc5MDkwM30.GSNF4mWLs99YOFpHU4wqxTWFYBHJraDXpnAy2SO_iSg';

        
            

            expect(localStorage.getItem('accessToken')).toEqual(a);


            unloadInDb(url, data).then(resutl => {
                log.debug(resutl);
                //expect(result).toBe(true);
            })

        
    });


    test('test2', () => {

        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment";

        const data = {
            'repair': 'testing',
            'author': 'test'
        }

        let b = testFunc(url, data, null, null);
        
            log.debug('result b ==' + b);


        
        
       


    });


    test.only('test3 - Loader Class', () => {

        const url = process.env.HTTP_API_HOST + ":" + process.env.HTTP_API_PORT + "/equipment";

        const data = {
            'repair': 'testing',
            'author': 'test'
        }

        
        let a = new Loader(url, "POST", data, null, null);

        customFetch()

        log.debug(b);



    });


});
