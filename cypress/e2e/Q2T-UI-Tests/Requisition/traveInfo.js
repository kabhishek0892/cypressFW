import { loginWithEmail, loginWithId } from '../Utils/apiUtils'
import { REQ_CONSTANTS } from '../Utils/requisitionConstants'
import { verifyListisNotNull,verifySearchResults } from '../Utils/commonUtils'
const INPUT_BUTTON_SELECTOR = '.addSearchWrap>input';

describe ('Traveller Information Testcases',()=>{
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithId(Cypress.env('username'), Cypress.env('password'))
        cy.visit('/createRequest')
        cy.viewport('macbook-16')
        cy.get('.headingSection>div').should('have.text',REQ_CONSTANTS.REQUEST_WORK_TRAVEL)
    })

    it('Validate Travel Info',()=>{
    cy.get('.tabTitle').should('have.text',REQ_CONSTANTS.TRAVELLING_MSG)
    cy.get('label[for="bookingFor"]').should('have.text',REQ_CONSTANTS.BOOKING_FOR).click()
    cy.get('#bookingFor>li').should(($ls) => {
     
        expect($ls.eq(0), 'myself').to.have.text('mr. abhishek kumar (self)')
        expect($ls.eq(1), 'group').to.have.text(REQ_CONSTANTS.BUSINESS_GROUP)
        expect($ls.eq(2), 'transfer').to.have.text(REQ_CONSTANTS.TRANSFER)
        expect($ls.eq(3), 'event').to.have.text(REQ_CONSTANTS.EVENT)
    })
    cy.get('body').click(50, 50, { force: true })

    cy.get('.travelTab>li').should(($ls) => {
        expect($ls, 'Two tabs').to.have.length(2)
        expect($ls.eq(0)).to.have.text(REQ_CONSTANTS.DOMESTIC)
        expect($ls.eq(0)).to.have.class(REQ_CONSTANTS.ACTIVE)
        expect($ls.eq(1)).to.have.text(REQ_CONSTANTS.INTERNATIONAL)
    }) 
   cy.get('.travellerInput>label').should('have.text',REQ_CONSTANTS.TRAVELLERS)
   //cy.get('.addedTraveller>span').should('have.text',$travellerName)
   cy.get('.dateSelectWrap').should('be.visible')
   cy.get('.createItnryBtn').should('be.enabled').should('have.text',REQ_CONSTANTS.CREATE_ITINERARY)
    })

    it('Validate Business Group Empty Search State',()=>{
        cy.get('label[for="bookingFor"]').should('have.text',REQ_CONSTANTS.BOOKING_FOR).click()
        cy.get('#bookingFor>li').contains('Business Group').click();
        cy.get('.addMoreTrl').should('have.text',REQ_CONSTANTS.ADD_TRAVELLER_MSG).click()
        cy.get('.addSearchWrap > .sprite').should('be.visible')
        cy.get('.travellerDwnHeading').should('contain',REQ_CONSTANTS.ADD_TRAVELLER)
        cy.get('.addSearchWrap>input').invoke('attr','placeholder').should('contain', REQ_CONSTANTS.ENTERTRAVLRNM)
        cy.get('.emptyStateText').should(($ls) => {
            expect($ls.eq(0)).to.contain.text(REQ_CONSTANTS.SEARCHCOLGMSG)
            expect($ls.eq(1)).to.contain.text(REQ_CONSTANTS.SEARCHTVLRMSG)
        })
        cy.get('form').find('img').should('have.attr', 'src').should('include','searchIcon')
        cy.get('.travellerDwn > .makeFlex').should('have.text',REQ_CONSTANTS.ADD_TRAVELLER_GRPMSG)
    })

    it('Search various profiles in Business Group',()=>{
        cy.get('label[for="bookingFor"]').should('have.text',REQ_CONSTANTS.BOOKING_FOR).click()
        cy.get('#bookingFor>li').contains('Business Group').click();
        cy.get('.addMoreTrl').should('have.text',REQ_CONSTANTS.ADD_TRAVELLER_MSG).click()
        cy.get('.addSearchWrap>input').invoke('attr','placeholder').should('contain', REQ_CONSTANTS.ENTERTRAVLRNM)
        cy.get(INPUT_BUTTON_SELECTOR).type('gau')
        cy.get('.recentAddedText').should('contain.text','Showing All Results')
        verifyListisNotNull('#ulContainer>li > .flexOne > .travellerDept')
        verifySearchResults('#ulContainer>li > .flexOne > .userName > .travellerName','gau')
        cy.get(INPUT_BUTTON_SELECTOR).clear().type('abh').wait(2000)
        verifySearchResults('#ulContainer>li > .flexOne > .userName > .travellerName','abh')
    })

    it ('No search result found',()=>{
        cy.get('label[for="bookingFor"]').should('have.text',REQ_CONSTANTS.BOOKING_FOR).click()
        cy.get('#bookingFor>li').contains('Business Group').click();
        cy.get('.addMoreTrl').should('have.text',REQ_CONSTANTS.ADD_TRAVELLER_MSG).click()
        cy.get('.addSearchWrap>input').invoke('attr','placeholder').should('contain', REQ_CONSTANTS.ENTERTRAVLRNM)
        cy.get(INPUT_BUTTON_SELECTOR).type('fjdfdj')
        cy.get('.emptyStateText').should(($ls) => {
            expect($ls.eq(0)).to.contain.text(REQ_CONSTANTS.NO_RESULTS_FOUND)
            expect($ls.eq(1)).to.contain.text(REQ_CONSTANTS.TRY_ANOTHER_SEARCH)
        })
    })
    //to do
    it.skip('Verify Consultant in Search Results',()=>{

    })
    it.skip('Verify Limit on passenger in Add flow (Domestic)',()=>{

    })
    it.skip('Verify Limit on passenger in Add flow (International)',()=>{

    })

})
