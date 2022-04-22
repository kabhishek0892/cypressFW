import HomePage from './HomePage'
import { loginWithEmail } from '../Utils/apiUtils'
import { CONSTANTS } from "../Utils/constants"
import { logout } from '../Utils/apiUtils'

describe('Incomplete Request Test suite', function () {

    const homePage = new HomePage();
    
    before(()=>{
        cy.viewport('macbook-16')
    })
    beforeEach(() => {
        loginWithEmail(Cypress.env('email'), Cypress.env('password'))
    })

    /*afterEach(()=>{
        logout()
     }) */

     //after block to delete that extra payload created 

    it('incompleterequest with domestic travel with rail and flight', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { fixture: "incomplete-req-flight-train.json" }).as('incompleteReq')
        cy.visit('/home/')
        cy.fixture('incomplete-req-flight-train').then(req => {
            cy.get('p.destination').eq(0).should('contain.text', req.data.incompleteRequest.services[0].title)
            cy.get('p.destination').eq('1').should('contain.text', req.data.incompleteRequest.services[1].title)

        })
    })

   it('incomplete request with all LOBs', () => {
        cy.readFile("cypress/fixtures/incomplete-req-flight-train.json", (err, x) => {
            if (err) {
                return console.error(err);
            };
        }).then((x) => {
            x.data.incompleteRequest.totalServices = '3 Service(s)'
            cy.writeFile("cypress/fixtures/incomplete-req-allLOBS.json", JSON.stringify(x))
        })

        cy.intercept("GET", "/home/inCompleteRequest", { fixture: "incomplete-req-allLOBS.json" }).as('incompleteReq')
        cy.visit('/home/')
        cy.wait('@incompleteReq')
        cy.fixture('incomplete-req-allLOBS.json').then(req => {
            cy.get('p.destination').eq(0).should('contain.text', req.data.incompleteRequest.services[0].title)
            cy.get('p.destination').eq('1').should('contain.text', req.data.incompleteRequest.services[1].title)
            cy.get('p.destination').eq('2').should('contain.text', req.data.incompleteRequest.totalServices)
        })
    }) 


    it('incomplete request with text message  ', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { fixture: "incomplete-req-text-only.json" })
        cy.visit('/home/').debug()
        cy.fixture('incomplete-req-text-only.json').then(req => {
            cy.get('p.tripIdText').should('contain.text', req.data.incompleteRequest.inCompleteReqText)
        })
    })
    
    it('incomplete request with empty response  ', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { fixture: "noresultfound.json" })
        cy.visit('/home/')
        cy.get('a[class="cpltItnryWrap"]').should('not.exist')
    })

    it('incomplete request with 500 error', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { fixture: "500-error.json" })
        cy.visit('/home/')
        cy.get('a[class="cpltItnryWrap"]').should('not.exist')
        //cy.get('.tryAgainBtn').should(exists)

    })

    it('incomplete request with 400 error', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { statusCode: 400 })
        cy.visit('/home/')
        cy.get('a[class="cpltItnryWrap"]').should('not.exist')
        cy.get('.startTripWrap > .card').should('be.visible')

    })
    it('incomplete request with 404 error', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { statusCode: 404 })
        cy.visit('/home/')
        cy.get('a[class="cpltItnryWrap"]').should('not.exist')
        cy.get('.startTripWrap > .card').should('be.visible')

    })

    it('incomplete request with 302 error', () => {
        cy.intercept("GET", "/home/inCompleteRequest", { statusCode: 302 })
        cy.visit('/home/')
        cy.get('a[class="cpltItnryWrap"]').should('not.exist')
        cy.get('.startTripWrap > .card').should('be.visible')

    }) 
})

    //cy.log(@x)
/*cy.get('@x').then((x) => {
    for (var i = 0; i < x.data.incompleteRequest.services.length; i++) {
      //Print the first Names
      console.log(x.data.incompleteRequest.services[i].title)
    }
  }) */
  //let titles=  cy.fixture("incomplete-req-flight-train").its('data.incompleteRequest.services').then(services => services.map(p => p.title))
   // console.log(titles)

    //cy.intercept('GET', '/inCompleteRequest', { fixture: 'incomplete-req-flight-train.json' }).as('incompleteReq')
    //.its('services').then(services => services.map(p => p.title))

   // cy.wait('@incompleteReq')


   // homePage.verifyWelcomeMessage()
   // homePage.verifyRequestItinerary(CONSTANTS.HOMEPAGE_ITINERARY)
    //homePage.verifyBookPersonalTravelandLobs()
    //homePage.clickonCloseIconinBookingPopup()
    //homePage.verifyQuickLinks()
   // homePage.verifyHamburgerMenu()
   // homePage.verifySupportMenu()
    //homePage.logout()
