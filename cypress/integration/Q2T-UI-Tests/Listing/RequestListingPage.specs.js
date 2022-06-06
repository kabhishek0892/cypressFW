import { loginWithId } from '../Utils/apiUtils'
import { verifyFormattedText, verifyListisNotNull } from '../Utils/commonUtils'
import { CONSTANTS } from '../Utils/constants'
import testdata from '/Users/mmt9361/Desktop/Corp-Q2T-Test-Automation-UI/cypress/fixtures/users.json'
const regex = new RegExp(/^(?=.*\bTraveller.*\b)(?=.*\bDay.*\b).*$/);
const NameRegex = new RegExp(/^Request sent to.*/);
var str = ''
const arr = []
/* Test cases list

Common :
My Requests Heading
No Requests Have Been Raised By You /Start a new Request CTA
----------------------------------------
Requestor  --> 
only 3 tabs --> To be approved , approved , others
dropdowns :
To be approved -->  only future trips , sort by Month , Sent Reminder feature for all trips (conditional) , 
Trip id , Trip duration ,People and Days ,Source Destination , View Request details --> common to all requests 
Approved --> only --> View Tickets(Approved and booked) and Book Now (Approved and Not booked)
Others --> Rejected
---------------------------------------------
Approver--> 
Two tabs -->
Raised By You : same as requestor
For you to approve:
Yet to Approve --> All future trips pending for approval 
Others --> All approved ,rejected ,cancelled requests
 */

describe('Request Listing Page Requestor View', () => {

    beforeEach(() => {
        cy.fixture('users.json').as('testdata');
    })

    it('My Requests heading and both tabs - approver view', () => {
        loginWithId(testdata[0].loginid, testdata[0].password)
        cy.visit('/requests/')
        cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
        //cy.get('.noReqWrap>p').should('have.text',CONSTANTS.NO_REQ_TO_APPROVE)
        cy.get('.tripReqTab>li').should(($ls) => {
            expect($ls, 'Two tabs').to.have.length(2)
            expect($ls.eq(0)).to.have.text(CONSTANTS.FOR_YOU_TO_APPROVE)
            expect($ls.eq(0)).to.have.class('active')
            expect($ls.eq(1)).to.have.text(CONSTANTS.RAISED_BY_YOU)
            // expect($ls.eq(1), 'My Trips').to.contain(CONSTANTS.MY_TRIP)
        })

    })

    it('My Requests Listing - Requestor Only', () => {
        loginWithId(testdata[3].loginid, testdata[3].password)
        cy.visit('/requests/')
        cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
        //cy.get('.noReqWrap>p').should('have.text',CONSTANTS.NO_REQ_TO_APPROVE)
        cy.get('.tripReqTab>li').should(($ls) => {
            expect($ls, 'Three tabs').to.have.length(3)
            expect($ls.eq(0)).to.have.text(CONSTANTS.TOBE_APPROVED)
            expect($ls.eq(0)).to.have.class('active')
            expect($ls.eq(1)).to.have.text(CONSTANTS.APPROVED)
            expect($ls.eq(2)).to.have.text(CONSTANTS.OTHERS)

        })
        verifyFormattedText('.reqPopsRow > :nth-child(1) > .capText', CONSTANTS.TRIP_ID)
        verifyFormattedText('.reqPopsRow > :nth-child(2) > .capText', CONSTANTS.TRIP_DURATION)
        cy.get('div.travellerNo>p').each(($el) => {
            expect($el.text()).match(regex)
        })

        cy.get('.remindReq > span').each(($el) => {
            expect($el.text()).match(NameRegex)
        })

        verifyListisNotNull('.reqPros > .makeFlex > .fromToPlace')
        verifyListisNotNull('.reqPopsRow > :nth-child(2) > .travelDates')

    })

    it.only('Raised By You - Approved By You View', () => {
        loginWithId(testdata[3].loginid, testdata[3].password)
        cy.intercept('home/tripRequests?view=requestor&reqTripSt=toBeApproved').as('tobeApproved')
        cy.visit('/requests/')
        cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
        cy.wait('@tobeApproved').then(({ response }) => {
            expect(response.statusCode).to.eq(200)
            const respBody = response.body;
            expect(respBody.data.headerName).to.eq('requestor')
            for (var i = 0; i < respBody.data.requestTabDetails.length; i++) {
                for (var j = 0; j < respBody.data.requestTabDetails[i].requests.length; j++) {
                    str = (respBody.data.requestTabDetails[i].requests[j].actualTripStartDate).split("T")[0]
                    var d = new Date(str)
                    arr.push(d)
                }
            }
             arr.forEach(function(entry) {
            cy.log(entry);
          }); 
        })
       

          

    })

    it('Raised By You - Approved', () => {

    })

    it('Raised By You - Others', () => {

    })
})

