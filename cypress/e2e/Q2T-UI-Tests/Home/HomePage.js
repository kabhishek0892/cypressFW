import { CONSTANTS } from "../Utils/constants"

class HomePage {

    verifyWelcomeMessage() {
        cy.get('.startTripWrap > h3').should('contain.text', CONSTANTS.START_TRIP)
    }

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
        cy.get('.startTripWrap>div>p:nth-child(2)>span').click({ force: true })
    }
    verifyBookPersonalTravelandLobs() {
        cy.get('a[class="bookTravel"]').click({ force: true })
        cy.get('div[class="bookTravelPop"] h2').should('have.text', CONSTANTS.PERSONAL_TAVEL)

        cy.get('p[class="lobTitle"]').should(($lis) => {
            expect($lis, '2 items').to.have.length(2)
            expect($lis.eq(0), 'first lob').to.contain(CONSTANTS.FLIGHT)
            expect($lis.eq(1), 'second lob').to.contain(CONSTANTS.HOTEL)
            /* expect($lis.eq(2), 'third lob').to.contain(CONSTANTS.GUEST_HOUSE)
             expect($lis.eq(3), 'fourth lob').to.contain(CONSTANTS.HOLIDAY_HOME)
             expect($lis.eq(4), 'fifth lob').to.contain(CONSTANTS.CORPORATE_LEISURE) */
            //try to use overloaded methods
            //to implement logic 
        })
    }
    clickonCloseIconinBookingPopup() {
        cy.get('.close').click()
        cy.log('Popup closed')
    }
    //to add click events once domain is shifted to MMT
    //verifies only when user has incomplete request - refactoring required in new UI
    verifyQuickLinks() {
        cy.get('body').then((body) => {
            if (body.find('div.cpltItnryWrap').length > 0) {
                cy.get('.verticalquickLinksCards>div>p').should(($ls) => {
                    expect($ls, 'Two Links').to.have.length(2)
                    expect($ls.eq(0), 'My Requests').to.contain(CONSTANTS.MY_REQUEST)
                    expect($ls.eq(1), 'My Trips').to.contain(CONSTANTS.MY_TRIP)
                })
            }
            else {
                cy.get('.quickLinksCards>div>p').should(($ls) => {
                    expect($ls, 'Two Links').to.have.length(2)
                    expect($ls.eq(0), 'My Requests').to.contain(CONSTANTS.MY_REQUEST)
                    expect($ls.eq(1), 'My Trips').to.contain(CONSTANTS.MY_TRIP)
                })
            }
        })
    }
   
    //to add click events once domain is shifted to MMT
    verifySupportMenu() {
        cy.get('.hamburger>div>p').eq('1').should('contain.text', CONSTANTS.CONTACT_US).click()
        cy.url().should('include', '/contactUs')
        cy.get('.contactCard').eq(0).find('h2').should('contain.text', CONSTANTS.CONTACT_INFO)
        cy.get('.contactCard>p.contactByTitle').eq(0).should('contain.text', CONSTANTS.CALL_US)
        cy.get('.contactCard>p.contactByTitle').eq(1).should('contain.text', CONSTANTS.WRITE_US)
        cy.get('.contactCard').eq(1).find('h2').should('contain.text', CONSTANTS.ESCALATION_MATRIX)
        cy.get('.selectWrap').click()
        cy.get('#SelectTimeline >li').each((element, index, list) => {
            expect(Cypress.$(element)).to.contain.text('Level')
            expect(index).to.be.greaterThan(-1)
            expect(list).to.have.length(5)
        })
    }

    verifyHamburgerMenu() {
        cy.get('.userSection > img').click()
        cy.get('.hamburger>div>ul>li').should(($ls) => {
            // expect($ls, 'Hamburger Links').to.have.length(3)
            expect($ls.eq(0), 'Profile').to.contain(CONSTANTS.MY_PROFILE)
        })
        cy.get('p[class="navTitle"]').should('have.text','Support')
        cy.get('p.navLinks>a').should(($ls) => {
            expect($ls.eq(0),'Escalation Matrix').to.contain(CONSTANTS.CONTACT_US_ESC_MATRIX)
            expect($ls.eq(1),'Travel Guidelines').to.contain(CONSTANTS.TRAVEL_GUIDELINES)
           /// expect($ls.eq(2),'User Travel Policy').to.contain(CONSTANTS.USER_TRVL_POLCIY)
            expect($ls.eq(2),'User Mannual').to.contain(CONSTANTS.USER_MANNUAL)

        })
        cy.get('body').click(50, 50, { force: true })
    }

    logout() {
        cy.log('Add logout functionality')
        cy.get('.userSection > img').click()
        cy.get('.pushBottom > .makeFlex').click()
    }

    rejectRequest() {
        if (cy.get('button.reqSelectBtn')) {
            cy.get('button.reqSelectBtn').eq(0).click()
            cy.get('#userInputField').type('Not relevant now')
            cy.get('button').should('contain.text', CONSTANTS.CONFIRM).click()
        }
    }
    approveRequest() {
        cy.get('.userSection > img').click()
        cy.get('button.reqApproveBtn')
    }

    verifyCustomerSupportSection() {
      
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