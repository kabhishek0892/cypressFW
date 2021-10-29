class LoginPage {

    fillEmail(value) {
        return cy.get('#userInputField').clear().type(value);
    }

    fillPassword(value) {
        return cy.get('[name="password"]').clear().type(value);
    }

    clickloginBtn() {
        return cy.get('[type="button"]').contains('LOGIN').should('be.enabled').click()
    }
    clicksendOTPBtn() {
        return cy.get('[type="button"]').contains('OTP').should('be.enabled').click()
    }
    getEmailPwdError() {
        return cy.get('.errorText').should('have.text', 'Incorrect password or the user Id provided is wrong.');
    }

    clikcOnClearFieldIcon() {
        return cy.get('.clearfieldIcon').click()
    }
    clickOnNextButton() {
        return cy.get('[type="button"]').contains('Next').should('be.enabled').click()
    }

    clickForgetPassword() {
        cy.verifyHyperlink("a[href='/forgotPassword']")
        return cy.get('.fgtLink>a').click()
    }

    verifyLoginScreen() {
        cy.get('.form>h2').should('exist').contains('Login to your Company Account')
        cy.get('label[for="userInputField"]').should('exist').contains('Enter your Login ID OR Email Address')
        cy.get('#userInputField').invoke('attr', 'placeholder').should('eq', "vainavi.va@company")
        return this
    }
    verifyPwdLScreen() {
        cy.get('form>h2').should('exist').contains('Enter Password')
        cy.get('label[for="userInputField"]').should('exist').contains('Password')
        cy.get(".setPwdDesc").should('have.text', "Enter the password for " + Cypress.env('email'))
        return this
    }
    verifyOTPScreen() {
        cy.get('.popupContent>h2').should('have.text', 'Verify OTP')
        cy.get('.verifyDesc').should('have.text', 'One Time Password (OTP) has been sent to your registered email address and mobile number.')
        cy.get('[type="button"]').contains('OTP').should('be.disabled')
        return this
    }

    verifyButton(buttonName) {
        return cy.get('[type="button"]').contains(buttonName)
    }

    verifyExpiredPasswordMsg() {
        return cy.get('p[class="fgtLink"] span:nth-child(1)')
    }

    verifyButtonEnableDisableBtn(buttonName) {
        switch (buttonName) {
            case 'Next':
                this.verifyButton(buttonName).should('be.disabled')
                this.fillEmail("  ")
                this.verifyButton(buttonName).should('be.disabled')
                this.fillEmail('slow.typing@email.com', { delay: 100 })
                this.verifyButton(buttonName).should('be.enabled')
                this.fillEmail('{selectall}{backspace}')
                this.verifyButton(buttonName).should('be.disabled')
                this.fillEmail('test@test.com')
                this.verifyButton(buttonName).should('be.enabled')
                break;

            case 'LOGIN':
                this.verifyButton(buttonName).should('be.disabled')
                this.fillPassword("  ")
                this.verifyButton(buttonName).should('be.enabled')
                this.fillPassword('testPwd', { delay: 100 })
                this.verifyButton(buttonName).should('be.enabled')
                this.fillPassword('{selectall}{backspace}')
                this.verifyButton(buttonName).should('be.disabled')
                this.fillPassword('newtestPwd')
                this.verifyButton(buttonName).should('be.enabled')
                break;

            default:
                cy.log("Invalid button value")
        }

    }
}
export default LoginPage;