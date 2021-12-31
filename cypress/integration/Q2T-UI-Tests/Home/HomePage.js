import {CONSTANTS} from "../Utils/constants"

class HomePage {

    verifyWelcomeMessage() { 
        cy.get('.startTripWrap > h3').should('contain.text', CONSTANTS.START_TRIP) }

    verifyRequestItinerary(expctMsg) {
        let actualMsg = '';
        cy.get('.startTripWrap>div>p').each(($el) => {
            actualMsg += $el.text() + ' '
            cy.log(actualMsg + "Inside the loop")
        })

        // assert.equal(actualMsg, expctMsg, 'Verified Itinerary message on Home Page')
        cy.log(actualMsg + "Outside the loop") //to check why actual message is not coming in actualMsg
    }
    clickRequestItinerary() {
        cy.get('.startTripWrap>div>p:nth-child(2)>span').click({force: true})
    }
    verifyBookPersonalTravelandLobs() {
        cy.get('a[class="bookTravel"]').click({force: true})
        cy.get('div[class="bookTravelPop"] h2').should('have.text', CONSTANTS.PERSONAL_TAVEL)

        cy.get('p[class="lobTitle"]').should(($lis) => {
            expect($lis, '5 items').to.have.length(5)
            expect($lis.eq(0), 'first lob').to.contain(CONSTANTS.FLIGHT)
            expect($lis.eq(1), 'second lob').to.contain(CONSTANTS.HOTEL)
            expect($lis.eq(2), 'third lob').to.contain(CONSTANTS.GUEST_HOUSE)
            expect($lis.eq(3), 'fourth lob').to.contain(CONSTANTS.HOLIDAY_HOME)
            expect($lis.eq(4), 'fifth lob').to.contain(CONSTANTS.CORPORATE_LEISURE)
            //try to use overloaded methods
            //to implement logic 
        })
    }
    clickonCloseIconinBookingPopup() {
        cy.get('.close').click()
        cy.log('Popup closed')
    }
    //to add click events once domain is shifted to MMT
    verifyQuickLinks() {

        cy.get('div.cpltItnryWrap').then($incmpltreq => {
            if ($incmpltreq.is(':visible')){
                cy.get('.verticalquickLinksCards>div>p').should(($ls) => {
                    expect($ls, 'Three Links').to.have.length(3)
                    expect($ls.eq(0), 'My Requests').to.contain(CONSTANTS.MY_REQUEST)
                    expect($ls.eq(1), 'My Trips').to.contain(CONSTANTS.MY_TRIP)
                    expect($ls.eq(2), 'My Expenses').to.contain(CONSTANTS.MY_APPROVAL)
                })
            }
            else{
                cy.get('.quickLinksCards>div>p').should(($ls) => {
                    expect($ls, 'Three Links').to.have.length(3)
                    expect($ls.eq(0), 'My Requests').to.contain(CONSTANTS.MY_REQUEST)
                    expect($ls.eq(1), 'My Trips').to.contain(CONSTANTS.MY_TRIP)
                    expect($ls.eq(2), 'My Expenses').to.contain(CONSTANTS.MY_APPROVAL)
                })
            }
        })
    }
        //verticalquickLinksCards
       /* cy.get('.quickLinksCards>div>p').should(($ls) => {
            expect($ls, 'Three Links').to.have.length(3)
            expect($ls.eq(0), 'My Requests').to.contain('My Requests')
            expect($ls.eq(1), 'My Trips').to.contain('My Trips')
            expect($ls.eq(2), 'My Expenses').to.contain('My Expenses')
        })
    }*/
    //to add click events once domain is shifted to MMT
    verifySupportMenu() {
        cy.get('.hamburger>div>p').eq('1').should('contain.text',CONSTANTS.CONTACT_US).click()
        cy.url().should('include', '/contactUs')
        cy.get('.contactCard').eq(0).find('h2').should('contain.text',CONSTANTS.CONTACT_INFO)
        cy.get('.contactCard>p.contactByTitle').eq(0).should('contain.text',CONSTANTS.CALL_US)
        cy.get('.contactCard>p.contactByTitle').eq(1).should('contain.text',CONSTANTS.WRITE_US)
        cy.get('.contactCard').eq(1).find('h2').should('contain.text',CONSTANTS.ESCALATION_MATRIX)
        cy.get('.selectWrap').click()
    }

    verifyHamburgerMenu() {
        cy.get('.userSection > img').click()
        cy.get('.hamburger>div>ul>li').should(($ls) => {
            // expect($ls, 'Hamburger Links').to.have.length(3)
            expect($ls.eq(0), 'Profile').to.contain(CONSTANTS.MY_PROFILE)
        })
    }

    logout() {
        cy.log('Add logout functionality')
        cy.get('img[alt="logout"]').click()
    }

    rejectRequest(){
        if(cy.get('button.reqSelectBtn')){
        cy.get('button.reqSelectBtn').eq(0).click()
        cy.get('#userInputField').type('Not relevant now')
        cy.get('button').should('contain.text',CONSTANTS.CONFIRM).click()}
    }
    approveRequest(){
       cy.get('.userSection > img').click()
       cy.get('button.reqApproveBtn')
    }
    
    verifyCustomerSupportSection(){
        verifyHamburgerMenu()
        

    }
    //For optimisation
   /* getLabels(labelName) {
        const labels = { Email: 1, Company: 2, Codes: 3 }
        return cy.get(`.pgn__form-group:nth-of-type(${labels[labelName]}) label`)
      }
      getFormField(fieldName) {
        return cy.get(`[name="${fieldName}"]`)
      }
      getCouponCode(columnNumber) {
        return cy.get(`.coupon-details-table td:nth-child(${columnNumber})`)
      }
      getLogoAltAttributes(logoContainer, attributeName, logoType = '/') {
        // This function takes parent container name, logo type and attribute name
        // as parameter and return attribute value
        return cy.get(logoContainer).find(`a[href="${logoType}"]>img`).invoke('attr', attributeName)
      } */
}
export default HomePage;