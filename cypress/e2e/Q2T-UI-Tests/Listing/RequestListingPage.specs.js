import { loginWithId } from '../Utils/apiUtils'
import { verifyFormattedText, verifyListisNotNull ,selectDropdownFromTabListingPage} from '../Utils/commonUtils'
import { CONSTANTS } from '../Utils/constants'
import testdata from '/Users/mmt9361/Desktop/Corp-Q2T-Test-Automation-UI/cypress/fixtures/users.json'
const travellerDays = new RegExp(/^(?=.*\bTraveller.*\b)(?=.*\bDay.*\b).*$/);
const requestSentTo = new RegExp(/^Request sent to.*/);
const regexPrice = new RegExp('^(₹[1-9]*\d*|Actuals$|As per actuals)');
const requestSentBy = new RegExp('REQUEST #[0-9]+ BY');
const requestID = new RegExp('REQUEST #[0-9]+')
const requestSentToxyz = new RegExp('Request sent to Mr.|Ms.*')

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
            cy.get('div.travellerNo>p:nth-child(1)').each(($el) => {
                expect($el.eq(0).text()).match(travellerDays)
        })

        cy.get('div.travellerNo>p:nth-child(2)').each(($el) => {
            expect($el.text()).match(regexPrice)
    })

    })

    it('My Requests Listing - Requestor Only', () => {
        loginWithId(testdata[3].loginid, testdata[3].password)
        cy.visit('/requests/')
        cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
        //cy.get('.noReqWrap>p').should('have.text',CONSTANTS.NO_REQ_TO_APPROVE)
        cy.get('.tripReqTab>li').should(($ls) => {
            expect($ls, 'Three tabs').to.have.length(3)
            expect($ls.eq(0)).to.not.deep.equal(CONSTANTS.TOBE_APPROVED)
            expect($ls.eq(0)).to.have.class('active')
            expect($ls.eq(1)).to.have.text(CONSTANTS.APPROVED)
            expect($ls.eq(2)).to.have.text(CONSTANTS.OTHERS)

        })

        verifyFormattedText('.reqPopsRow > :nth-child(2) > .capText', CONSTANTS.TRIP_DURATION)
        cy.get('div.travellerNo>p').each(($el) => {
            expect($el.text()).match(travellerDays)
        })

        cy.get('.remindReq > span').each(($el) => {
            expect($el.text()).match(requestSentTo)
        })

        verifyListisNotNull('.reqPros > .makeFlex > .fromToPlace')
        verifyListisNotNull('.reqPopsRow > :nth-child(2) > .travelDates')

    })

    it('Raised By You - Approved By You View', () => {
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

    it('Raised By You - To Be Approved', () => {
        loginWithId(testdata[4].loginid, testdata[4].password)
        cy.visit('/requests/')
        cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
        //cy.get('.noReqWrap>p').should('have.text',CONSTANTS.NO_REQ_TO_APPROVE)
        cy.get('.tripReqTab>li').should(($ls) => {
            expect($ls, 'Two tabs').to.have.length(2)
            expect($ls.eq(0)).to.have.text(CONSTANTS.FOR_YOU_TO_APPROVE)
            if ($ls.eq(0).hasClass('active')) {
                $ls.eq(1).click()
                expect($ls.eq(1)).to.have.text(CONSTANTS.RAISED_BY_YOU)
                expect($ls.eq(1)).to.have.class('active')
              }      
            })

          /* cy.get('.selectOutput').should('have.text','To be approved')
           cy.get('body').then((body) => {
            if (body.find('.noReqWrap>.newReqBtn').length > 0) {
                cy.get('.noReqWrap>.noReqTitle').should('contain.text','You do not have any request')
            }*/ 
       
           cy.get('li[data-testid]').each(($el,index,$list)=>{
             expect($el.find('.regLeft> .reqPopsRow > .travellerNo>:nth-child(1)').text()).match(travellerDays)
             expect($el.find('.regLeft > .reqPopsRow > :nth-child(2) > .capText')).to.have.text(CONSTANTS.TRIP_DURATION)
             expect($el.find('.regLeft > .reqPopsRow > :nth-child(1) > .capText').text()).match(requestID)
             expect($el.find('.regLeft > .reqPopsRow > :nth-child(1) > .travelAt').text()).not.to.be.empty
             expect($el.find('.regLeft > .reqPros > .makeFlex > .fromToPlace').text()).not.to.be.empty
             expect($el.find('.reqRejAppBtns > .viewReqDtl')).to.contain.text(CONSTANTS.VIEW_REQUEST_DETAIL_CTA) 
          }) 
           
    })

    it('Raised By You - Others', () => {
        loginWithId(testdata[0].loginid, testdata[0].password)
        cy.visit('/requests/')
        selectDropdownFromTabListingPage(CONSTANTS.RAISED_BY_YOU,CONSTANTS.TOBE_APPROVED)
      /*  cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
        cy.get('.tripReqTab>li').should(($ls) => {
            expect($ls, 'Two tabs').to.have.length(2)
            expect($ls.eq(0)).to.have.text(CONSTANTS.FOR_YOU_TO_APPROVE)
          if ($ls.eq(0).hasClass('active')) {
                $ls.eq(1).click()
                expect($ls.eq(1)).to.have.text(CONSTANTS.RAISED_BY_YOU)
                expect($ls.eq(1)).to.have.class('active')
              }      
            }) 

            

            cy.get('.selectOutput').then(($dropdown) => {
                if ($dropdown) {
                 $dropdown.click()
                 cy.get('.selectOuter>ul').find('>li').filter(':contains("Others")').click({force: true})
                } else {
                  // do something else
                }
              }) */
    })

    it('Generic method to validate all the elements in a block in listing page',()=>{
        loginWithId(testdata[0].loginid, testdata[0].password)
        cy.visit('/requests/')
        cy.get('li[data-testid]').each(($el,index,$list)=>{
          // cy.log($el.find('.regLeft > .reqPopsRow > .travellerNo > .reqPrice').text())
           expect($el.find('.regLeft > .reqPopsRow > .travellerNo > .reqPrice').text()).match(regexPrice)
           expect($el.find('.regLeft> .reqPopsRow > .travellerNo>:nth-child(1)').text()).match(travellerDays)
           expect($el.find('.regLeft > .reqPopsRow > :nth-child(2) > .capText')).to.have.text(CONSTANTS.TRIP_DURATION)
           expect($el.find('.regLeft > .reqPopsRow > :nth-child(1) > .capText').text()).match(requestSentBy)
           expect($el.find('.regLeft > .reqPopsRow > :nth-child(1) > .travelAt').text()).not.to.be.empty

           //Reject cy.get('[data-testid="213289Listing"] > .reqRejAppBtns > .makeFlex > .reqSelectBtn')
           //Apprrove cy.get('[data-testid="213289Listing"] > .reqRejAppBtns > .makeFlex > .reqApproveBtn')
           //View Request Details -- cy.get('[data-testid="213289Listing"] > .reqRejAppBtns > .viewReqDtl')
           
        })
    })
})

