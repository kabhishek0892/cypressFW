import HomePage from './HomePage'
import { loginWithEmail } from '../Utils/apiUtils'
import {CONSTANTS} from "../Utils/constants"

describe('Home Page Tests with different types of views',function(){
    const homePage = new HomePage();
    it('No access to Expenses card in Quick Links',()=>{
        
    loginWithEmail(Cypress.env('email'),Cypress.env('password'))
    cy.visit('/home/')
    //cy.Login(Cypress.env('email'),Cypress.env('password'))
    cy.viewport('macbook-16')
    homePage.verifyWelcomeMessage()
    homePage.verifyRequestItinerary(CONSTANTS.HOMEPAGE_ITINERARY)
    homePage.verifyBookPersonalTravelandLobs()
    homePage.clickonCloseIconinBookingPopup()
    homePage.verifyQuickLinks()
    homePage.verifyHamburgerMenu()
    homePage.verifySupportMenu()
    homePage.logout()
})
})