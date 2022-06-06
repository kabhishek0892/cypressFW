export const resetPwdApi = () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('APIURL') +'/login'+'/resetPassword',
   
    body: {
          "loginid": Cypress.env('username'),
          "newPassword": Cypress.env('password')
         }
  }).should((response) => {
    expect(response.status).eq(200)
    cy.log(JSON.stringify(response.body))
 })
}

export const loginWithEmail = (email,password) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('APIURL') +'/login',
   
    body: {
          "email": email,
          "password": password
         }
  }).should((response) => {

   /* if((response.body.status)!="Sucesss")
    {
      resetPwdApi()
    } */

    cy.log(JSON.stringify(response.body))
 })
}

export const loginWithId = (loginId,password) => {
  cy.request({
    method: 'POST',
    url: Cypress.env('APIURL') +'/login',
   
    body: {
          "loginid": loginId,
          "password": password
         }
  }).should((response) => {
    //expect(response.status).eq(200)
    cy.log(JSON.stringify(response.body))
 })
}

export const logout =()=>{
  cy.request('POST', Cypress.env('APIURL') +'/home/logout').then(
    (response) => {
      // response.body is automatically serialized into JSON
      expect(response.isOkStatusCode)
      cy.log(JSON.stringify(response.body))
    }
  )
}


//incompleteRequest