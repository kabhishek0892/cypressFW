import { loginWithEmail, loginWithId } from '../Utils/apiUtils'
import { rejectRequest, approveRequest, sendReminder, verifyListisNotNull, verifyFormattedText } from '../Utils/commonUtils'
import { CONSTANTS } from '../Utils/constants'

describe.skip('Only Requestor Test suite', () => {
    it('Requestor sends Reminder for pending request ', () => {
        loginWithId('q2ttsllemp', 'p@ssw0rd')
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-request-requestor-profile.json" })
        cy.visit('/home/')
        cy.get('.tripReqHeading > h2').should('be.visible').and('have.text', CONSTANTS.TRIP_REQUEST)
        cy.get('.tripReqTab').should('not.exist')
        verifyFormattedText('.reqCard > li >p', CONSTANTS.TRIP_ID)
        verifyFormattedText('.reqPros > .reqSend > .spaceRight', CONSTANTS.REQUEST_SENT_TO)
        verifyListisNotNull('.reqPopsRow > .pushRight > :nth-child(1)')
        verifyListisNotNull('.reqPros > .makeFlex > .fromToPlace')
        cy.intercept("POST", "/home/remind", { fixture: "trip-requests-reminder.json" })
        sendReminder(207080)
    })

})
describe('My Trips Requests Test suite', function () {
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithEmail(Cypress.env('email'), Cypress.env('password'))
    })

    it('Requestor and Approver view', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-both-mock.json" })
        cy.visit('/home/')
        cy.get('.tripReqTab > .active').should('have.text', CONSTANTS.FOR_YOU_TO_APPROVE)
        cy.get('.tripReqTab > li').should(($ls) => {
            expect($ls, 'Two tabs').to.have.length(2)
            expect($ls.eq(0)).to.have.text(CONSTANTS.FOR_YOU_TO_APPROVE)
            expect($ls.eq(0)).to.have.class('active')
            expect($ls.eq(1)).to.have.text(CONSTANTS.RAISED_BY_YOU)
            // expect($ls.eq(1), 'My Trips').to.contain(CONSTANTS.MY_TRIP)
        })
        verifyListisNotNull('.reqPopsRow > .makeFlex > .travelAt')
        verifyListisNotNull('.reqPopsRow > .pushRight > .reqPrice') // add number check && > 0 price check
        verifyListisNotNull('.reqPopsRow > .makeFlex > .travelDates')
        verifyListisNotNull('.reqPros > .makeFlex > .fromToPlace')
        verifyListisNotNull('.reqPopsRow > .pushRight > :nth-child(1)') //add x people ,y days assertion
        verifyListisNotNull('.reqPros > .makeFlex')
        verifyListisNotNull('.reqRejAppBtns > .reqApproveBtn')
        verifyListisNotNull('.reqRejAppBtns > .reqSelectBtn')
        //cy.get('.lineError').should('have.text','Request could not be Accepted due to an unexpected error')
    })

    it('Verify Approve Request', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-approver-only-mock.json" })
        cy.visit('/home/')
        cy.intercept("POST", "/home/approve", { fixture: "trip_approve.json" })
        approveRequest(201465)

    })

    it('Requests raised but nothing to approve', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-requestor-only-mock.json" })
        cy.visit('/home/')
        verifyListisNotNull('.reqPopsRow > .makeFlex > .travelAt')
        verifyListisNotNull('.reqPopsRow > .makeFlex > .travelDates')
        verifyListisNotNull('.reqPros > .makeFlex > .fromToPlace')
        verifyListisNotNull('.reqPopsRow > .pushRight > p') //add x people ,y days assertion
        verifyFormattedText('.reqCard > li >p', CONSTANTS.TRIP_ID)
        verifyFormattedText('.reqPros > .reqSend > .spaceRight', CONSTANTS.REQUEST_SENT_TO)
    })

    //to do
    /* it('1 trip FOR YOU TO APPROVE and 0 trip in RAISED BY YOU ', () => {
         cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-A1-R0.json" })
         cy.visit('/home/')
         cy.screenshot()
     })
     it('0 trip FOR YOU TO APPROVE and 1 trip in RAISED BY YOU ', () => {
         cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-A0-R1.json" })
         cy.visit('/home/')
         cy.screenshot()
     }) */

    //Cypress._.times(5, () => {
    it('Approve Request - FOR YOU TO APPROVE Section', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-approver-only-mock.json" })
        cy.visit('/home/')
        cy.intercept("POST", "/home/approve", { fixture: "trip_approve.json" })
        approveRequest(201465)
    })
    //})
    it('Reject Request - FOR YOU TO APPROVE Section', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-requests-approver-only-mock.json" })
        cy.visit('/home/')
        cy.intercept("POST", "/home/reject", { fixture: "trip_reject.json" })
        rejectRequest(200875)

    })

    it('Remind Request - RAISED BY YOU Section', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip-request-requestor-profile.json" })
        cy.visit('/home/')
        cy.intercept("POST", "/home/remind", { fixture: "trip-requests-reminder.json" })
        sendReminder(207080)
    })

    it('Empty request', () => {
        cy.intercept("GET", "/home/tripRequests", { fixture: "trip_request_empty_response.json" })
        cy.visit('/home/')
        cy.get('.tripReqHeading > h2').should('not.exist')
    })

    it('500 Error', () => {
        cy.intercept("GET", "/home/tripRequests", { statusCode: 500 })
        cy.visit('/home/')
        cy.get('.tripReqHeading > h2').should('not.exist')
    })

    it('404 Error', () => {
        cy.intercept("GET", "/home/tripRequests", { statusCode: 404 })
        cy.visit('/home/')
        cy.get('.tripReqHeading > h2').should('not.exist')
    })

    it('302 Error', () => {
        cy.intercept("GET", "/home/tripRequests", { statusCode: 302 })
        cy.visit('/home/')
        cy.get('.tripReqHeading > h2').should('not.exist')


    })

})