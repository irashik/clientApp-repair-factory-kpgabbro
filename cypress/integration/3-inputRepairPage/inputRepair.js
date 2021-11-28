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



describe('testing inputRepair page', () => {
 

  before(() => {
    // login user
    cy.visit('http://localhost:8080');
    cy.get('#loginButton').click();
    cy.get('#formBasicEmail').type('dima@test.ru');
    cy.get('#formBasicPassword').type('dima');
    cy.get('#signIn').click();
    cy.get('#inputData').click();
    cy.get('#tableRepair').contains('#');

    
  });

  it('create new repair', () => {

    /*
    открыть модальное
    ввести данные
    нажать сохранить.

    проверить появление этих данных
    */

    
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
    cy.visit('http://localhost:8080');
    cy.get('#LogoutBtn').click();
    cy.on('window:confirm', () => true);
    cy.url().should('include', 'localhost:8080');
  });

  
  
})
