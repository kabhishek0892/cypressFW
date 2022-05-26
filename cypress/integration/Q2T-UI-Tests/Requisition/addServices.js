import {loginWithId } from '../Utils/apiUtils'
import { REQ_CONSTANTS } from '../Utils/requisitionConstants'
import {verifyFormattedText,verifyLobListAndHierarchy,addLOB,addParticularLOB} from '../Utils/commonUtils'

describe('Add Services TestCases',()=>{
    before(() => {
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithId(Cypress.env('username'), Cypress.env('password'))
        cy.visit('/createRequest')
        cy.viewport('macbook-16')
        cy.get('.headingSection>div').should('have.text',REQ_CONSTANTS.REQUEST_WORK_TRAVEL)
    })

    it('Add Hotel Service',()=>{
        cy.get('.dateDayWrap').click()
        cy.get('[aria-label="Mon Jun 20 2022"]').click()
        cy.get('[aria-label="Wed Jun 29 2022"]').click()
        cy.get('.dateDoneBtn').click()
        cy.get('.createItnryBtn').click()
        cy.get('.addSerWrap > h2').should('be.visible').should('have.text','Add Services')
        verifyFormattedText('.lobInfo>.linkText','+Add')
        verifyLobListAndHierarchy('.lobInfo>.lobName','domestic')
        addParticularLOB('Accommodation')
    })
})