/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

import { v4 as uuid } from 'uuid';

let repair1, repair2, mat1, mat2, val1, val2, job;

describe('testing inputRepair page', () => {
 
  function login_fake() {
    // login user
    cy.session('mysession', () => {
      cy.visit('http://localhost:8080/');
      cy.get('#loginButton').click();
      cy.get('#formBasicEmail').type('cypress@test.test');
  
      cy.get('#formBasicPassword').type('cypress');
      cy.get('#signIn').click();
  
      cy.url().should('eq', 'http://localhost:8080/');
    });
  };


  function login() {

    const data = {
      email: 'cypress@test.test',
      password: 'cypress'

    };


    cy.request("POST", 'http://localhost:3000/auth/login', data)
      .then(result => {

        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('userName', result.userName);
        localStorage.setItem('userId', result.userId);
      
    });

    

  }

  function logout_fake() {
    cy.visit('http://localhost:8080');
    cy.get('#LogoutBtn').click();
    cy.on('window:confirm', () => true);
    


  }

  function logout() {

    const url = new URL ('http://localhost:3000/auth/logout');
    url.searchParams.set('userId', localStorage.getItem('userId'));
    url.searchParams.set('userName', localStorage.getItem('userName'));

    const accessToken = localStorage.getItem('accessToken');
    const tokenstr = "Bearer " + accessToken;

    const options = {
      url: url.href.toString(),
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': tokenstr
      }
    };


    cy.request(options)
      .then(()=> {
        localStorage.clear();
    });

  }

  before(() => {
    //With session validation


    // // login user
    // cy.session('mysession', () => {
    //   cy.visit('http://localhost:8080/');
    //   cy.get('#loginButton').click();
    //   cy.get('#formBasicEmail').type('cypress@test.test');
  
    //   cy.get('#formBasicPassword').type('cypress');
    //   cy.get('#signIn').click();
  
    //   cy.url().should('eq', 'http://localhost:8080/');
    // });
    

    repair1 = uuid();
    repair2 = uuid();
    mat1 = uuid();
    mat2 = uuid();
    val1 = Math.round(Math.random() * 100);
    val2 = Math.round(Math.random() * 100);
    job = Math.round(Math.random() * 100);


    
  });

  beforeEach(() => {
      login();

  });


  it('create new repair', () => {

    /*
    открыть модальное
    ввести данные
    нажать сохранить.

    */
    //cy.get('#inputData').click();
    cy.visit('http://localhost:8080/inputData');

    // todo выбор даты и времени 

    cy.get('#AddRepairEquipment').click();

    cy.get('#inputEquipment').type('ЩД');

    cy.get('#filteredListUnitEquipment').contains("(Бункер ЩД").click();


    cy.get('#inputRepairDescription_0').type(repair1);
    cy.get('#btnAddDesc_repair').click();
    cy.get('#inputRepairDescription_1').type(repair2);

    cy.get('#inputMaterialName_0').type(mat1);
    cy.get('#inputMaterialVal_0').type(val1);

    cy.get('#btnAddDesc_material').click();
    cy.get('#inputMaterialName_1').type(mat2);
    cy.get('#inputMaterialVal_1').type(val2);

    cy.get('#inputSpendingJob').type(job);

    cy.get('#CreateRepairbtn').click();


    
  });

  it('check new repair', () => {


    cy.visit('http://localhost:8080/inputData');

    //  проверить появление этих данных 

    cy.get('td').contains('6129bf3fce9e4ac80ae1e2aa');


    cy.get('td').contains(repair1.toString());
    cy.get('td').contains(repair2).toString();
    cy.get('td').contains(mat1.toString());
    cy.get('td').contains(val1);
    cy.get('td').contains(mat2.toString());
    cy.get('td').contains(val2);

    cy.get('td').contains(job);


  });

  it('change repair record', () => {

    /*
    взять любую запись открыть модальное
    ? взять значения из таблицы?
    проверить, значения.
    изменить + добавить значения
    нажать сохранить
    проверить значения в таблице.
    */

  });

  it('incorrect record', () => {

    /*
    пустую запись нельзя
    верификация в полях ввода
    */
    
  });


  

after(() => {
  repair1 = null;
  repair2 = null;
  mat1 = null;
  mat2 = null;
  val1 = null;
  val2 = null;
  job = null;


});



afterEach(() => {
   logout();
});
  
  
  
})
