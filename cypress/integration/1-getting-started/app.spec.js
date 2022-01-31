

describe('main page test and main link passage', () => {
  

  before(() => {

    Cypress.Commands.add('login', (username, password) => {
      cy.session([username,  password], () => {
        cy.visit('http://localhost:8080/auth');
        cy.get('#formBasicEmail').type(username);
        cy.get('#formBasicPassword').type(password);
        cy.get('#signIn').click();
        cy.url().should('eq', 'http://localhost:8080/')
      })
    });
  });


  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })

  it('login user', () => {
    cy.get('#loginButton').click();

    cy.get('#formBasicEmail').type('dima@test.ru');
    cy.get('#formBasicPassword').type('dima');
    cy.get('#signIn').click();

    cy.url().should('eq', 'http://localhost:8080/')
    
  })

  it('click navbar button', () => {

    cy.login('dima@test.ru', 'dima')
    cy.visit('http://localhost:8080')



    cy.get('#inputData').click();
    cy.url().should('include', 'inputData');

    
    cy.get('#tableRepair').contains('#');

    cy.get('#reportEquipment').click();
    cy.url().should('include', 'reportEquipment');
    cy.get('#reportInputEquipment').type('ЩД');
    cy.get('#filteredListUnitEquipment').contains("(Бункер ЩД");


    cy.get('#repairPlan').click();
    cy.url().should('include', 'repairPlan');
    cy.get('#tablePlansRepair').contains('Плановые работы');

    cy.get('#bidRequest').click();
    cy.url().should('include', 'bidRequest');
    cy.get('#tableBidRequest').contains("Описание заявки");

    cy.get("#labelUserNameNav").click();
    cy.url().should('include', 'profile');
    cy.get("h2").contains('Профиль пользователя');

  });

  it('user logout', () => {

    cy.login('dima@test.ru', 'dima')
    cy.visit('http://localhost:8080')


    cy.get('#LogoutBtn').click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Logout is successfully!');
    });
    cy.on('window:confirm', () => true);
    cy.url().should('eq', 'http://localhost:8080/');

  });

  
  after(() => {
    cy.visit('http://localhost:8080')
  })
  
})
