import { loginWithId} from './Utils/apiUtils'
describe('Demo Test suite',()=>{
    it('Test Home Page',()=>{
    loginWithId('Abhishek','test@123')
    cy.viewport('macbook-16')
    cy.visit('http://{{baseUrl}}/frontend/singlerequest/selectServices')
    cy.wait(4000)
    cy.get('.scroll_height > :nth-child(2)').then($closeIcon => {
        if ($closeIcon.is(':visible')){
            $closeIcon.click()
        }
      })
      cy.get('#btnOk').then($button => {
        if ($button.is(':visible')){
            $button.click()
        }
      })
      cy.get('#txtTripTitle').type('Automated Trip')
      cy.get('#txtTripStartCity').type('Delhi')
      cy.get('#txtTripDestinationCity').type('Mumbai')
      cy.get('#selRequestFor').select('MySelf')
      cy.get('#txtTripFrom').click()
      cy.get(':nth-child(2) > :nth-child(7) > .ui-state-default').click()
      cy.get('#txtTripTo').click()
      cy.get(':nth-child(4) > :nth-child(5) > .ui-state-default').click()
      cy.get('#chkCab').click()
      cy.get('.marr0 > span > .city-scope').click()
      cy.get('#cmdCity0').select('Delhi')
      cy.get('#cmdDuration0').select('Half Day')
      cy.get('#txtPickupDate0').click()
      cy.get('.ui-datepicker-group-first > .ui-datepicker-calendar > tbody > :nth-child(2) > :nth-child(6) > .ui-state-default').click()
      cy.get('#btnNext').click().wait(3000)
      
      cy.get('#btnOk').then($button => {
        if ($button.is(':visible')){
            $button.click()
        }
      })
     cy.get('.two_radio > :nth-child(1) > input').then($button => {
        if ($button.is(':visible')){
            $button.click()
            cy.get('#taProceedReason').type('for test')
            cy.get('#btnProceedSubmit').click()
        }
      })
      cy.get('#btnNext').click().wait(3000)
      cy.get('#btnOk').then($button => {
        if ($button.is(':visible')){
            $button.click()
        }
      })
      cy.get('.cnf_pad_two > :nth-child(2) > .sub_innee').click().wait(3000)
      cy.get('#btnOk').then($button => {
        if ($button.is(':visible')){
            $button.click()
        }
      })
      cy.get(':nth-child(3) > .marr5 > #chkPurposeOfVisit').click()
      cy.get('#txtRecruitment').type('Testing')
      cy.get('#chkVC').click()
      cy.get('#cmdSubmit').click()
      cy.log(cy.get('.submit_request > .allround_h1'))


    })
})