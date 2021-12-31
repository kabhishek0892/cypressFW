import { loginWithEmail } from '../Utils/apiUtils'
import { CONSTANTS } from "../Utils/constants"
import { verifyListisNotNull } from '../Utils/commonUtils'
import { eq } from 'lodash'
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
})