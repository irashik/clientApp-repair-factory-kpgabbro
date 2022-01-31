import { v4 as uuid } from 'uuid';



describe('testing bidRequest page', () => {

  let newBidText, newBidComment;



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

    newBidText = uuid();
    newBidComment = uuid();

  });

  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

 


  it('insert name equipment and view data', () => {
    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/bidRequest');

    cy.get('table#tableBidRequest').contains('#');
    cy.get('#EditBidRequest').should('have.attr', 'type', 'button');

    cy.get('#filterSelectStatusBid').select('Черновик').should('have.value', 'DRAFT');
    cy.get('#filterSelectCategoryBid').select('Инструмент').should('have.value', 'Инструмент');
    cy.get('#filterSelectPriorityBid').select('Срочно!').should('have.value', 'Срочно');
    
  });

  it('edit repair item in report', () => {
    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/bidRequest');


    cy.get('#EditBidRequest:first').click();
    cy.get('button.btn-close').should('have.attr', 'type', 'button');
    cy.get('#UpdateBidBtn').click();
    cy.get('#AddBidRequest').click();
    cy.get('button.btn-close').should('have.attr', 'type', 'button');


  });

  it('create new bidRequest', () => {
    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/bidRequest');
    cy.get('#AddBidRequest').click();


    cy.get('.modal').within(() => {

      cy.get('#createBid').type(newBidText);

    
      cy.get('#filterSelectStatusBid').select("Активная").should('have.value', 'ACTIVE');
      cy.get('#filterSelectCategoryBid').select('Инструмент').should('have.value', 'Инструмент');
      cy.get('#filterSelectPriorityBid').select('Срочно!').should('have.value', 'Срочно');
      cy.get('#inputComment').type(newBidComment);
        cy.get('#CreateBidBtn').click();

    })
    



  });


  it('check new bid created', () => {

    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/bidRequest');

    cy.get('table#tableBidRequest').contains(newBidText);
    cy.get('table#tableBidRequest').contains(newBidComment);





  });

 

  it.skip('incorrect record', () => {

    /*
    пустую запись нельзя
    верификация в полях ввода
    */
    
  });


  afterEach(() => {
  
  })

  

  after(() => {
  


  });




  

});
