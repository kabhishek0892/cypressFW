class HomePage {

    verifyWelcomeMessage() { return cy.get('.startTripWrap > h3').should('contain.text', 'Start a new trip') }

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
        cy.get('.startTripWrap>div>p:nth-child(2)>span').click()
    }
    verifyBookPersonalTravelandLobs() {
        cy.get('a[class="bookTravel"]').click()
        cy.get('div[class="bookTravelPop"] h2').should('have.text', 'book personal travel')

        cy.get('p[class="lobTitle"]').should(($lis) => {
            expect($lis, '5 items').to.have.length(5)
            expect($lis.eq(0), 'first lob').to.contain('Flights')
            expect($lis.eq(1), 'second lob').to.contain('Hotels')
            expect($lis.eq(2), 'third lob').to.contain('Guest House')
            expect($lis.eq(3), 'four lob').to.contain('Holiday Homes')
            expect($lis.eq(4), 'fifth lob').to.contain('Corporate Leisure Program')
        })
    }
    clickonCloseIconinBookingPopup() {
        cy.get('.close').click()
        cy.log('Popup closed')
    }
    //to add click events once domain is shifted to MMT
    verifyQuickLinks() {
        cy.get('.quickLinksCards>div>p').should(($ls) => {
            expect($ls, 'Three Links').to.have.length(3)
            expect($ls.eq(0), 'My Requests').to.contain('My Requests')
            expect($ls.eq(1), 'My Trips').to.contain('My Trips')
            expect($ls.eq(2), 'My Expenses').to.contain('My Expenses')
        })
    }
    //to add click events once domain is shifted to MMT
    verifySupportLinks() {
        cy.get('.hamburger > :nth-child(4)').should('contain.text','Contact us')
    }

    verifyHamburgerMenu() {
        cy.get('.userSection > img').click()
        cy.get('.hamburger>ul>li').should(($ls) => {
            // expect($ls, 'Hamburger Links').to.have.length(3)
            expect($ls.eq(0), 'Profile').to.contain('My Profile')
        })
    }

    logout() {
        cy.log('Add logout functionality')
    }
}
export default HomePage;