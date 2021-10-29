import { loginWithId } from '../Utils/apiUtils'
import HomePage from './HomePage'
const userdata = require('/Users/mmt9361/Corp-Q2T-Test-Automation/cypress/fixtures/users.json')

userdata.forEach((credentials) => {
    describe('Home Page Tests', function () {
        const homePage = new HomePage();

        beforeEach(() => {
            cy.fixture('testdata').then(creds => {
                this.creds = creds;
            })
            cy.fixture('verbiage').then(text => {
                this.text = text;
            })
            cy.fixture('users').then(user => {
                this.user = user;
            })

            //loginWithEmail(Cypress.env('email'),Cypress.env('password'))
            loginWithId(credentials.loginid, credentials.password)
            cy.visit('/home/')
            cy.viewport('macbook-16')
        })

        it('Verify Home Page', () => {
            homePage.verifyWelcomeMessage()
            homePage.verifyRequestItinerary(this.text.homePage_itineraryMsg)
            homePage.verifyBookPersonalTravelandLobs()
            homePage.clickonCloseIconinBookingPopup()
            homePage.verifyQuickLinks()
            homePage.verifyHamburgerMenu()
            homePage.verifySupportLinks()
            homePage.logout()

        })
    })
})