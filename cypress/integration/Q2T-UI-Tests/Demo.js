import {loginAPI} from './Utils/apiUtils'
describe('Demo Test suite',()=>{
    it('Test Home Page',()=>{
        loginAPI()
        cy.visit('http://partner.quest2travel.org:8004/home/')
       /* cy.get('#userInputField').clear().type('Abhishek.kumar3@go-mmt.com')
        cy.get('[type="button"]').contains('Next').should('be.enabled').click()
        cy.get('[name="password"]').type('test@123')
        
        cy.get('[type="button"]').contains('LOGIN').should('be.enabled').click()
        
        cy.wait(30000) */
        cy.url().should('include', '/home')
    })
})