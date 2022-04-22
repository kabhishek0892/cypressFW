import { loginWithEmail, loginWithId } from '../Utils/apiUtils'
import { CONSTANTS } from '../Utils/constants'

describe ('Create requisition scenarios',()=>{
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithId(Cypress.env('username'), Cypress.env('password'))
        cy.visit('/createRequest/')
    })

    it('Create a new request with Hotel Only',()=>{
      

    })

})
