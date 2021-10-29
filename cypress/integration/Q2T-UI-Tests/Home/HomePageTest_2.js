import { loginWithEmail } from '../Utils/apiUtils'

describe('Home Page Tests with different types of views',()=>{
    it('No access to Expenses card in Quick Links',()=>{
    loginWithEmail(Cypress.env('email'),Cypress.env('password'))
    cy.visit('/home/')
    cy.viewport('macbook-16')
   /* cy.request({
        method: 'GET',
        url: 'http://localhost:3000/profile',
      }).should((response) => {
        expect(response.status).eq(200)
        cy.log(JSON.stringify(response.body))
     }) */
    
   // cy.intercept('GET', '/home/profile', { fixture: 'profileAndHeader.json' }).as('profile')
    /* cy.request({
        method: 'GET',
        url: Cypress.env('APIURL') +'/home/profile'
      },
      {
          statusCode :200,
          body  :[{fixture: 'profileAndHeader.json'}]
      }).as('mockProfileresponse').should((response)=>
      { 
          expect(response.status).eq(200) 
          expect(response).property('clientId').to.equal('Mock')
    cy.log(response.body)})*/
})
})