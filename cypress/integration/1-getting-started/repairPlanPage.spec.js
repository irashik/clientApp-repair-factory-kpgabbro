
import { v4 as uuid } from 'uuid';



describe('testing report repair page', () => {

  let repair1, repair2, mat1, mat2, val1, val2;


  before(() => {
    
    Cypress.Commands.add('login', (email, password) => {
      cy.session([email,  password], () => {

        cy.visit('http://localhost:8080/auth');
        cy.get('#formBasicEmail').type(email);
        cy.get('#formBasicPassword').type(password);
        cy.get('#signIn').click();
        cy.url().should('eq', 'http://localhost:8080/')

       

      });
    });

    repair1 = uuid();
    repair2 = uuid();
    mat1 = uuid();
    mat2 = uuid();
    val1 = Math.round(Math.random() * 100);
    val2 = Math.round(Math.random() * 100);

  });

 

  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });




 


  it('insert name equipment and view data', () => {

    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/repairPlan');


    cy.get('table#tablePlansRepair').contains('#');
    cy.get('#EditPlanRepair').should('have.attr', 'type', 'button');

    
  });

  it('edit repair item in report', () => {

    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/repairPlan');


    cy.get('#EditPlanRepair:first').click();
    cy.get('button.btn-close').should('have.attr', 'type', 'button');

    cy.get('#UpdatePlanbtn').click();
    
    cy.get('#AddPlanRepair').click();
    cy.get('button.btn-close').should('have.attr', 'type', 'button').click();

    

  


  });

 

  it.skip('incorrect record', () => {

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


  });


  

});
