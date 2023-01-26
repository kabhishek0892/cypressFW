describe('login suite',()=>{
    it(('Login'),()=>{
        
        cy.visit('url')
        cy.get('#userInputField').clear().type('abhishek')
        cy.get('[type="button"]').contains('Next').should('be.enabled').click()
        cy.get('[name="password"]').clear().type('Test@123')
        cy.get('[type="button"]').contains('LOGIN').should('be.enabled').click()
        cy.wait(5000)
    })
})
