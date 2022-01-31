import { v4 as uuid } from 'uuid';


describe('register new user', () => {

  let userName;
  let email;
  let password;
  let position;

  before(() => {
    cy.visit('http://localhost:8080');

    userName = uuid();
    email = userName + "@test.test";
    password = userName;
    position = 'tester'

  });

  it('open register page and submit', () => {

    cy.get('#registerButton').click();
    cy.url().should('include', '/register')
    cy.get('h2').contains('Зарегистрируйтесь');
    
  
    cy.get('#formBasicEmail').type(email);
    cy.get('#formBasicName').type(userName);
    cy.get('#formBasicPassword').type(password);
    cy.get('#formBasicPosition').type(position);

    cy.get('#registerSubmitBtn').click();
    cy.on('window:alert', (str) => {
      expect(str).to.match(/Заявка на регистрацию создана!/);
    });


    cy.on('window:confirm', () => true);

    cy.url().should('include', '/auth');

  });

  



  
  
})
