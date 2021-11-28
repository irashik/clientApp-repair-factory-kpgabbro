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


describe('register new user', () => {

  let userName;
  let email;
  let password;

  before(() => {
    cy.visit('http://localhost:8080');

    userName = uuid();
    email = userName + "@test.test";
    password = userName;

  });

  it('open register page', () => {

    cy.get('#registerButton').click();
    cy.url().should('include', '/register')
    cy.get('h2').contains('Зарегистрируйтесь');
    
  });

  it('insert data and submit', () => {

    cy.get('#formBasicEmail').type(email);
    cy.get('#formBasicName').type(userName);
    cy.get('#formBasicPassword').type(password);

    cy.get('#registerSubmitBtn').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Вы успешно зарегистрировались!');
    });

    cy.on('window:confirm', () => true);
    cy.url().should('include', '/auth');

  });

  it('login a new user', () => {
    cy.get('#formBasicEmail').type(email);
    cy.get('#formBasicPassword').type(password);
    cy.get('#signIn').click();
    cy.url().should('eq','http://localhost:8080/');
  });


  

  after(() => {
    cy.visit('http://localhost:8080');
    cy.get('#LogoutBtn').click();
    cy.on('window:confirm', () => true);
    cy.url().should('include', 'localhost:8080');
  });

  
  
})
