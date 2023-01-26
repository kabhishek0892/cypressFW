/// <reference types="cypress" />
describe('Test Landing Page Test', () => {
    it('Launch login Page', () => {
        cy.visit('http://html.mmt.com:2096/Landing')
        cy.get('.container > .sprite').contains('Logo').should('be.visible')
    })
    it('User launches clicks on Book Personal Travel', () => {
        cy.get('.bookTravel').click({ force: true })
        cy.get('.lobTitle').contains('Hotels').click()
        cy.get('.close').click()
    })
    it('user lists down various trips in My trips section', () => {
        //Fetch Elements in array
        cy.get('div.myTripsWrap>ul>li>div>div>p.tripCities').each(($element) => {
            cy.log("Object is " + $element.text())
        })
    })
    it('user switches between approved and pending requests', () => {
        cy.get('ul.tripReqTab> li').contains('Raised').click({ force: true })
        cy.get('button[class=reqBookBtn]')
            .should('be.enabled')
            .should('have.text', 'Book tickets')
    })
    it('user clicks user flyout after switching to mobile view', () => {
        //changing from Dweb to Mweb view with viewport command
        cy.viewport('iphone-x')
        cy.get('.userSection').click()
        cy.get('.humbuger>p>a')
            .should('contain', 'Contact Us')
            .should('be.visible')
    })
})
