/// <reference types="Cypress" />
import LoginPage from './LoginPage'
import { RandomFn } from '../Utils/commonUtils'

describe('Login Page Tests', function () {

    beforeEach(() => {
        cy.visit('/login/')
        cy.fixture('testdata').then(creds => {
            this.creds = creds;
        })
        cy.fixture('verbiage').then(msg => {
            this.msg = msg;
        })
    })
    const loginPage = new LoginPage()

    it('Login using email ID', () => {
        loginPage.verifyLoginScreen()
        loginPage.fillEmail(this.creds.email)
        loginPage.clickOnNextButton()
        //resetPwdApi()
        //loginPage.verifyPwdLScreen()
        loginPage.fillPassword(this.creds.password)
        loginPage.clickloginBtn()
    })

    it('Verify CTA Buttons i.e Next , Login and Reset Pwd', () => {
        loginPage.verifyButtonEnableDisableBtn('Next');
        loginPage.fillEmail(this.creds.loginId)
        loginPage.clickOnNextButton()
        loginPage.verifyButtonEnableDisableBtn('LOGIN');
    })

    it('Login using loginID', () => {
        loginPage.fillEmail(this.creds.loginId)
        loginPage.clickOnNextButton()
        //resetPwdApi()
        loginPage.fillPassword(this.creds.password)
        loginPage.clickloginBtn()
    })

    it('Login with invalid username', () => {
        loginPage.fillEmail(RandomFn('email'))
        loginPage.clickOnNextButton()
        loginPage.fillPassword(RandomFn('password'))
        loginPage.clickloginBtn()
        loginPage.getEmailPwdError()
    })

    it('Login with invalid password', () => {
        loginPage.fillEmail(this.creds.email)
        loginPage.clickOnNextButton()
        loginPage.fillPassword(RandomFn())
        loginPage.clickloginBtn()
        loginPage.getEmailPwdError()
    })

    it('Reset password', () => {
        loginPage.fillEmail(this.creds.email)
        loginPage.clickOnNextButton()
        loginPage.clickForgetPassword()
        loginPage.fillEmail(this.creds.email)
        loginPage.clicksendOTPBtn()
        loginPage.verifyOTPScreen()

    })

    it('Expired Password Test using mock', () => {
        loginPage.verifyLoginScreen()
        loginPage.fillEmail(this.creds.email)
        loginPage.clickOnNextButton()
        loginPage.verifyPwdLScreen()
        loginPage.fillPassword(this.creds.password)
        cy.intercept('POST', '/login', { fixture: 'expired-pwd-mock.json' }).as('login')
        loginPage.clickloginBtn()
        loginPage.verifyExpiredPasswordMsg().should('contain.text', this.msg.password_expired)
        loginPage.clickForgetPassword()
        loginPage.clicksendOTPBtn()

    })
    it('Verify Set new password Screen in case of Password mismatch', () => {
        loginPage.fillEmail(this.creds.email)
        loginPage.clickOnNextButton()
        loginPage.clickForgetPassword()
        loginPage.fillEmail(this.creds.email)
        cy.intercept('POST', '/login/sendOtp', { fixture:'sentOTP.json'})
        loginPage.clicksendOTPBtn()
        loginPage.enterOTP()
        cy.intercept('POST', '/login/verifyOtp', { fixture:'verifyOTP.json'})
        loginPage.clickVerifyOTPBtn()
        loginPage.verifySetNewPasswordScreen("pwdmismatch")
    })

    it('Verify No error message is visible in case user clears password', () => {
        loginPage.fillEmail(this.creds.email)
        loginPage.clickOnNextButton()
        loginPage.clickForgetPassword()
        loginPage.fillEmail(this.creds.email)
        cy.intercept('POST', '/login/sendOtp', { fixture:'sentOTP.json'})
        loginPage.clicksendOTPBtn()
        loginPage.enterOTP()
        cy.intercept('POST', '/login/verifyOtp', { fixture:'verifyOTP.json'})
        loginPage.clickVerifyOTPBtn()
        loginPage.verifySetNewPasswordScreen("clearPassword")
    })

})