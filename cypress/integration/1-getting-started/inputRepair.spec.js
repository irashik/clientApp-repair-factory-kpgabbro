
import { v4 as uuid } from 'uuid';



describe('testing inputRepair page', () => {

  let repair1, repair2, mat1, mat2, val1, val2;


  before(() => {
    
    Cypress.Commands.add('login', (email, password) => {
      cy.session([email,  password], () => {

        cy.visit('http://localhost:8080/auth');
        cy.get('#formBasicEmail').type(email);
        cy.get('#formBasicPassword').type(password);
        cy.get('#signIn').click();
        cy.url().should('eq', 'http://localhost:8080/')

        // const data = {
        //   email,
        //   password
        // };
    
        // cy.request("POST", 'http://localhost:3000/auth/login', data)
        //   .then(result => {
        //     localStorage.setItem('accessToken', result.accessToken);
        //     localStorage.setItem('refreshToken', result.refreshToken);
        //     localStorage.setItem('userName', result.userName);
        //     localStorage.setItem('userId', result.userId);
        // });


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
  })


 


  it('create record new repair', () => {

    /*
    открыть модальное
    ввести данные
    нажать сохранить.
    */

    // cy.visit('http://localhost:8080')


    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/inputData');

    // todo выбор даты и времени 
    cy.get('#AddRepairEquipment').click();
    cy.get('#inputEquipment').type('ЩД');
    cy.get('#filteredListUnitEquipment').first().click();
    cy.get('#inputRepairDescription_0').type(repair1);
    cy.get('#btnAddDesc_repair').click();
    cy.get('#inputTypeRepair_0').select('Хоз.работы').should('have.value', 'CHORES');
    cy.get('#inputRepairDescription_1').type(repair2);
    cy.get('#inputTypeRepair_1').select('Обслуживание').should('have.value', 'SERVICE')
    cy.get('#inputMaterialName_0').type(mat1);
    cy.get('#inputMaterialVal_0').type(val1);
    cy.get('#btnAddDesc_material').click();
    cy.get('#inputMaterialName_1').type(mat2);
    cy.get('#inputMaterialVal_1').type(val2);
    cy.get('#CreateRepairbtn').click();

    
  });

  it('check created record repair', () => {

    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/inputData');

    //  проверить появление этих данных 

    cy.get('td').contains('Хоз.работы');
    cy.get('td').contains('Обслуживание');

    cy.get('td').contains(repair1.toString());
    cy.get('td').contains(repair2).toString();
    cy.get('td').contains(mat1.toString());
    cy.get('td').contains(val1);
    cy.get('td').contains(mat2.toString());
    cy.get('td').contains(val2);
    cy.get('td').contains('test cypress');



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


    cy.login('cypress@test.test', 'cypress');
    cy.visit('http://localhost:8080/inputData');

    
    cy.get('#editRepair').first().click();
    
    cy.wait(2000)
    let pattern = '7 дробилка';
    cy.get('#inputEquipment').should('have.value', pattern);
    cy.get('#inputRepairDescription_0').contains(repair1.toString());
    cy.get('#inputTypeRepair_0').should('have.value', 'Хоз.работы');

    cy.get('#inputRepairDescription_1').contains(repair2.toString());
    cy.get('#inputTypeRepair_1').should('have.value', 'Обслуживание')



    //   cy.get('#inputMaterialName_0').type(mat1);
    //   cy.get('#inputMaterialVal_0').type(val1);
    //   cy.get('#btnAddDesc_material').click();
    //   cy.get('#inputMaterialName_1').type(mat2);
    //   cy.get('#inputMaterialVal_1').type(val2);
    //   cy.get('#CreateRepairbtn').click();

   
    // cy.get('td').contains(repair2).toString();
    // cy.get('td').contains(mat1.toString());
    // cy.get('td').contains(val1);
    // cy.get('td').contains(mat2.toString());
    // cy.get('td').contains(val2);




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
