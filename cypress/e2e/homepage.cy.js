// Iteration 4
// Cypress testing: Be sure to stub all network requests:

// Write a test covering what should be displayed when the user first visits the page.
// Write a test to check the user flow of adding a new order to the DOM.
// Write a test to check that orders cannot be submitted without a name and at least one ingredient.
//test that they can't click on the button 
//test one for name and one for ingredients 

describe('homepage', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode:200,
      fixture:"example.json"
    })
    cy.visit('http://localhost:3000/')
    })
  it('it should view all of the elements on the homepage', () => {
    cy.get('h1').should('be.visible').contains('Burrito Builder')
    .get('form').should('be.visible').find('input').should('be.visible')
    .get('form').get('[name="beans"]').should('be.visible')
    .get('form').get('[name="steak"]').should('be.visible')
    .get('form').get('[name="carnitas"]').should('be.visible')
    .get('form').get('[name="sofritas"]').should('be.visible')
    .get('form').get('[name="lettuce"]').should('be.visible')
    .get('form').get('[name="queso fresco"]').should('be.visible')
    .get('form').get('[name="pico de gallo"]').should('be.visible')
    .get('form').get('[name="hot sauce"]').should('be.visible')
    .get('form').get('[name="guacamole"]').should('be.visible')
    .get('form').get('[name="jalapenos"]').should('be.visible')
    .get('form').get('[name="cilantro"]').should('be.visible')
    .get('form').get('[name="sour cream"]').should('be.visible')
    .get('p').should('be.visible').contains('Order:')
    .get('[disabled=""]').should('be.visible')
    .get('section').should('be.visible').children().should('have.length', 3)
    .get('section').first().contains('h3', 'Pat')
  })

  it('should be able to add an order to the form and post that order', () => {
    cy.intercept('POST', "http://localhost:3001/api/v1/orders", {
     statusCode:200,
     body: {
       name:'Caitlin',
       ingredients: ["guacamole"]
     }
    })
    cy.get('form').find('input').type('Caitlin').should('have.value', 'Caitlin')
    .get('form').find('[name="guacamole"]').click().should('have.attr', 'name', 'guacamole')
    .get('.submit').click()
    .get('section').children().should('have.length', 4)
    .get('section').first().contains('h3', 'Caitlin')
    .get('section').first().contains('li', 'guacamole')

  })
  
  // Write a test to check that orders cannot be submitted without a name and at least one ingredient.
//test that they can't click on the button 
//test one for name and one for ingredients 

  it('should not be able to click submit and POST if either or both input field is blank' , () => {
    cy.get('form').find('.submit').should('be.disabled')
    .get('form').find('input').type('Caitlin')
    .get('form').find('.submit').should('be.disabled')
    .get('form').find('input').clear()
    .get('form').find('[name="guacamole"]').click()
    .get('form').find('.submit').should('be.disabled')
  })
})