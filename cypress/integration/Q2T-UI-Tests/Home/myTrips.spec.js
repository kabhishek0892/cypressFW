import { loginWithEmail } from '../Utils/apiUtils'
import { CONSTANTS } from "../Utils/constants"
import { verifyListisNotNull } from '../Utils/commonUtils'

describe('My Trips Test suite', function () {
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithEmail(Cypress.env('email'), Cypress.env('password'))
    })
    it('My Top Trips with Flights ', () => {
        cy.intercept("GET", "/home/myTrips", { fixture: "mytrips-mock.json" }).as('mytrips')
        cy.visit('/home/')
        cy.wait('@mytrips')
        cy.get('.myTripsWrap > h2').should('contain.text', CONSTANTS.MYTRIPS)
        cy.get('.viewAllTrips').should('have.text', CONSTANTS.VIEW_ALL)
        cy.get('.makeFlex > .myTripDtl > .tripStatus').each(($el) => {
            assert.equal($el.text(), 'UPCOMING', 'values equal')

        })

        verifyListisNotNull('.makeFlex > .myTripDtl > .tripStatus')
        verifyListisNotNull('.makeFlex > .myTripDtl > .tripCities')
        verifyListisNotNull('.makeFlex > .myTripDtl > .tripDates')
        verifyListisNotNull('.makeFlex > .myTripDtl > .tripTraveller')

    })
    it('Empty request', () => {
        cy.intercept("GET", "/home/myTrips", { fixture: "my_trips_empty_response.json" })
        cy.visit('/home/') 
        cy.get('.myTripsWrap > h2').should('not.exist')
    })

    it('500 Error', () => {
        cy.intercept("GET", "/home/myTrips", { statusCode: 500 })
        cy.visit('/home/')
        cy.get('.myTripsWrap > h2').should('not.exist')
    })

    it('400 Error', () => {
        cy.intercept("GET", "/home/myTrips", { statusCode: 400 })
        cy.visit('/home/')
        cy.get('.myTripsWrap > h2').should('not.exist')
    })

    it('302 Error', () => {
        cy.intercept("GET", "/home/myTrips", { statusCode: 302 })
        cy.visit('/home/')
        cy.get('.myTripsWrap > h2').should('not.exist') 
    }) 
})