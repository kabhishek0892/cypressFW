import 'cypress-mochawesome-reporter/register';
import './commands'
require('cypress-xpath')

// Alternatively you can use CommonJS syntax:
// require('./commands')
import addContext from "mochawesome/addContext";
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `${Cypress.config('screenshotsFolder')}/${ Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }
});

/*
Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win, 'self', {
    get: () => {
      return window.top
    }
  })
})
*/
//`${Cypress.config('screenshotsFolder')}/${ Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
//'${Cypress.config('screenshotsFolder')}' by 'assets' only
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      launchOptions.args.push('--auto-open-devtools-for-tabs');
    } else if (browser.family === 'firefox') {
      launchOptions.args.push('-devtools');
    } else if (browser.name === 'electron') {
      launchOptions.preferences.devTools = true;
    }

    return launchOptions;
  });
};