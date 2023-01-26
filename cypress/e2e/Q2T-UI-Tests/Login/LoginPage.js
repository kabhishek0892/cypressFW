import HomePage from "../Home/HomePage";
import { CONSTANTS } from "../Utils/constants";

class LoginPage {

    fillEmail(value) {
        return cy.get('#userInputField').clear().type(value);
    }

    fillPassword(value) {
        return cy.get('[name="password"]').clear().type(value);
    }

    clickloginBtn() {
        cy.get('[type="button"]').contains('LOGIN').should('be.enabled').click()
        return new HomePage
    }
    clicksendOTPBtn() {
        return cy.get('[type="button"]').contains('OTP').should('be.enabled').click()
    }

    clickVerifyOTPBtn(){
        return cy.get('[type="button"]').contains('Verify OTP').should('be.enabled').click() 
    }
    getEmailPwdError() {
        return cy.get('.errorText').should('have.text', CONSTANTS.INCORRECT_PWD_MSG);
    }

    clikcOnClearFieldIcon() {
        return cy.get('.clearfieldIcon').click()
    }
    clickOnContinueButton() {
        return cy.get('[type="button"]').contains('CONTINUE').should('be.enabled').click()
    }
    clickOnSetPasswordButton() {
        return cy.get('[type="button"]').contains('SET PASSWORD').should('be.enabled').click()
    }

    clickForgetPassword() {
        cy.verifyHyperlink("a[href='/forgotPassword']")
        return cy.get('.fgtLink>a').click()
    }

    verifyLoginScreen() {
        cy.get('.form>h2').should('exist').contains(CONSTANTS.LOGIN_MSG)
        cy.get('label[for="userInputField"]').should('exist').contains(CONSTANTS.ENTER_LOGIN_ID)
        cy.get('#userInputField').invoke('attr', 'placeholder').should('eq', CONSTANTS.LOGIN_PLCAEHOLDER)
    }
    verifyPwdLScreen() {
        cy.get('form>h2').should('exist').contains(CONSTANTS.ENTER_PWD)
        cy.get('label[for="userInputField"]').should('exist').contains('Password')
        cy.get(".setPwdDesc").should('have.text', "Enter the password for " + Cypress.env('email'))
        return this
    }
    verifyOTPScreen() {
        cy.get('.popupContent>h2').should('have.text', 'Verify OTP')
        cy.get('.verifyDesc').should('have.text', CONSTANTS.OTP_MSG)
        cy.get('[type="button"]').contains('OTP').should('be.disabled')
        return this
    }

    verifySetNewPasswordScreen(condition){
        cy.get('.popupContent>h2').should('have.text', 'Set Password')
        cy.get(".setPwdDesc").should('have.text', "Enter a new password for " + Cypress.env('email'))
        cy.get('label[for="newPasswordInputField"]').should('exist').contains('New Password')
        cy.get('label[for="confirmPasswordInputField"]').should('exist').contains('Confirm Password')
        cy.get('#newPasswordInputField').type("Test@123")
        if(condition=="pwdmismatch")
        {
            cy.get('#confirmPasswordInputField').type("Test@1234") 
            this.clickOnSetPasswordButton()
            cy.get('p.errorText').should('be.visible').and('have.text',CONSTANTS.PASSWORDMISMATCH)
        }
        if(condition=="clearPassword")
        {
            cy.get('#confirmPasswordInputField').type("Test@1234") 
            this.clickOnSetPasswordButton()
            cy.get('p.errorText').should('be.visible').and('have.text',CONSTANTS.PASSWORDMISMATCH)
            cy.get('#confirmPasswordInputField').clear()
            cy.get('.errorText').should('not.exist')
            cy.get('#newPasswordInputField').clear()
            cy.get('p.errorText').should('not.exist')
        }
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

    enterOTP(){
        cy.get('.popupContent>h2').should('have.text', 'Verify OTP')
        cy.get('.otpInputWrapper>input').eq(0).type(1)
        cy.get('.otpInputWrapper>input').eq(1).type(2)
        cy.get('.otpInputWrapper>input').eq(2).type(3)
        cy.get('.otpInputWrapper>input').eq(3).type(4)

    }

    login(){
        this.fillEmail("Abhishek.kumartest.com")
        this.fillPassword("Test@123")
        this.clickOnNextButton()
        this. clickOnContinueButton()

    }
}
export default LoginPage;