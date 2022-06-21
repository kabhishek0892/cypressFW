describe('login suite',()=>{
    it(('Login'),()=>{
        
        cy.visit('http://partner.quest2travel.org:8006/login/')
        cy.get('#userInputField').clear().type('abhishek')
        cy.get('[type="button"]').contains('Next').should('be.enabled').click()
        cy.get('[name="password"]').clear().type('Test@123')
        cy.get('[type="button"]').contains('LOGIN').should('be.enabled').click()
        cy.wait(5000)
    })
})
