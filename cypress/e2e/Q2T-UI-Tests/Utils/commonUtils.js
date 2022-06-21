import { CONSTANTS } from "../Utils/constants"

/* Function to generate combination of password */
export function RandomFn(input) {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (var i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }
    if (input == 'email') { return pass + '@testdomain.com' }
    else { return pass }
}

export function verifyListisNotNull(listlocator) {
    cy.get(listlocator).each(($el) => {
        assert.isNotNull($el.text(), 'is not null')
    })
}

export function verifyFormattedText(listlocator,text) {
    cy.get(listlocator).each(($el) => {
      assert.isNotNull($el.text(), 'is not null')
      expect($el.text()).to.contain(text)
    })
}
export function verifyElementisVisible(locator,boolean){
   if(boolean==true)
    cy.get(locator).should('be.visible')
    else{
    cy.get(locator).should('not.be.visible')  
    }
}
export function approveRequest(request_id) {
    //cy.get('.reqCard')
    cy.get("[data-testid=\"" + request_id + "\"] > .reqRejAppBtns > .reqApproveBtn").then($button => {
        if ($button.is(':visible')) {
            $button.click()
        }
    })
    cy.get("[data-testid=\"" + request_id + "\"] > .reqRejAppBtns > .reqApproveBtn").should('not.exist')

}
export function rejectRequest(request_id) {
    cy.get("[data-testid=\"" + request_id + "\"] > .reqRejAppBtns > .reqSelectBtn").then($button => {
        if ($button.is(':visible')) {
            $button.click()
        }
    })
    // cy.get("[data-testid=\""+ request_id + "\"] > .reqRejAppBtns > .reqSelectBtn").click()
    cy.get('.reqRejectPopUp').should('be.visible')
    cy.get('.reqRejectPopUp > h2').should('have.text', CONSTANTS.REJECT_REQUEST)
    cy.get('label').should('have.text', CONSTANTS.REASON_REJECTION)
    cy.get('#userInputField').type('automated message')
    cy.get('.button').should('have.text', CONSTANTS.CNF_REJECT_REQUEST).click()
    cy.get("[data-testid=\"" + request_id + "\"] > .reqRejAppBtns > .reqSelectBtn").should('not.exist')
}

export function sendReminder(request_id) {
    cy.get("[data-testid=\"" + request_id +"Link"+ "\"]").click()
}

export function verifySearchResults(listlocator,searchText) {
    cy.get(listlocator).each(($el) => {
        expect($el.text()).to.contain(searchText)
        assert.isNotNull($el.text(), 'is not null')
    })
}

// Use of Lodash to get property "innerText" from every item in the array

export function verifyLobListAndHierarchy(listlocator,region) {
    if(region=='domestic')
    {
        cy.get(listlocator)
        .should('have.length', 4)
        .then(($els) => {
          // jQuery => Array => get "innerText" from each
          return Cypress._.map(Cypress.$.makeArray($els), 'innerText')
        })
        .should('deep.equal', ['Flights', 'Accommodation', 'Trains','Buses'])
    }

    else{
        cy.get(listlocator)
        .should('have.length', 4)
        .then(($els) => {
          // jQuery => Array => get "innerText" from each
          return Cypress._.map(Cypress.$.makeArray($els), 'innerText')
        })
        .should('deep.equal', ['Flights', 'Forex', 'Insurance','Visa'])
    }
    
  }

  export function addLOB(lob){
  cy.get('.lobInfo').each(($ele) => {
    if ($ele.find('.lobName').contains(lob)) {
        cy.get('.lobInfo>.lobName').siblings('.linkText').click()
    }
})
  }

  export function addParticularLOB(lob){
    cy.get('.lobInfo>.lobName:contains('+lob+')').each(($row) => {
        cy.wrap($row).siblings('.linkText').click()
      })
      
  }