// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('verifyHyperlink', (locator) => {
  cy.get(locator).invoke('attr', 'href')
    .then(href => {
      cy
        .request(href)
        .its('status')
        .should('eq', 200);

    });
})
Cypress.Commands.add('Login', (email, password) => {
  cy.get('#userInputField').clear().type(email)
  cy.get('[type="button"]').contains('Next').should('be.enabled').click()
  cy.get('[name="password"]').type(password)
  cy.get('[type="button"]').contains('LOGIN').should('be.enabled').click()
  cy.wait(4000)
  cy.url().should('include', '/home')
})

Cypress.Commands.add('logout', () => {
  cy.contains('Login').should('not.exist')
  cy.get('.avatar').click()
  cy.contains('Logout').click()
})

Cypress.Commands.add('buttonClick', (buttoName) => {
  cy.get('[type="button"]').contains('buttoName').should('be.enabled').click()
})

Cypress.Commands.add('forceVisit', url => {
  cy.window().then(win => {
    return win.open(url, '_self');
  });
});