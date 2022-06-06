import HomePage from './HomePage'
import { loginWithEmail } from '../Utils/apiUtils'
import {CONSTANTS} from "../Utils/constants"

describe('Home Page Tests with different types of views for Single User',function(){
    const homePage = new HomePage();
    it('Verify Home Page with Expenses',()=>{
    loginWithEmail(Cypress.env('email'),Cypress.env('password'))
    cy.visit('/home/')
    homePage.verifyWelcomeMessage()
    homePage.verifyRequestItinerary(CONSTANTS.HOMEPAGE_ITINERARY)
    homePage.verifyBookPersonalTravelandLobs()
    homePage.clickonCloseIconinBookingPopup()
    homePage.verifyQuickLinks()
    homePage.verifyHamburgerMenu()
    homePage.verifySupportMenu()
    //homePage.logout()
})
})