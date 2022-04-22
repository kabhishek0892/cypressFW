import { loginWithId } from '../Utils/apiUtils'
import { CONSTANTS } from '../Utils/constants'
import HomePage from './HomePage'
const userdata = require('/../Corp-Q2T-Test-Automation-UI/cypress/fixtures/users.json')

userdata.forEach((credentials) => {
    describe('Home Page Tests', function () {
        const homePage = new HomePage();

        beforeEach(() => {
            loginWithId(credentials.loginid, credentials.password)
            cy.visit('/home/')
            cy.viewport('macbook-16')
        })

        it('Verify Home Page', () => {
            homePage.verifyWelcomeMessage()
            homePage.verifyRequestItinerary(CONSTANTS.HOMEPAGE_ITINERARY)
            homePage.verifyBookPersonalTravelandLobs()
            homePage.clickonCloseIconinBookingPopup()
            homePage.verifyQuickLinks()
            homePage.verifyHamburgerMenu()
           // homePage.verifySupportLinks()
            //homePage.logout()

        })
    })
})