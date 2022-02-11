import { loginWithEmail, loginWithId } from '../Utils/apiUtils'
import { CONSTANTS } from '../Utils/constants'
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

describe ('Request Listing Page Requestor View',()=>{
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithId('LIPLtest_emp','test@123')
        cy.visit('/requests/')
    })
    afterEach(() => {
        cy.screenshot()
    })

    it('Verify request heading',()=>{
        cy.get('.tripReqWrap > h2').should('be.visible').and('have.text', CONSTANTS.MY_REQUEST)
    })

})

