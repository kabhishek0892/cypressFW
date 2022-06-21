import { loginWithId } from '../Utils/apiUtils'
import { CONSTANTS } from '../Utils/constants'
import HomePage from './HomePage'
const userdata = require('/../Corp-Q2T-Test-Automation-UI/cypress/fixtures/users.json')

userdata.forEach((credentials) => {
    describe('Home Page Tests with multiple users', function () {
        const homePage = new HomePage();

        beforeEach(() => {
            loginWithId(credentials.loginid, credentials.password)
            cy.visit('/home/')
        })

        it('Verify Home Page', () => {
            homePage.verifyWelcomeMessage()
            homePage.verifyRequestItinerary(CONSTANTS.HOMEPAGE_ITINERARY)
            homePage.verifyBookPersonalTravelandLobs()
            homePage.clickonCloseIconinBookingPopup()
            homePage.verifyQuickLinks()
            homePage.verifyHamburgerMenu()
            homePage.verifySupportMenu()
           // homePage.logout()

        })
    })
})