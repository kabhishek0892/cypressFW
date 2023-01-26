const { defineConfig } = require('cypress')

module.exports = defineConfig({
  pageLoadTimeout: 10000,
  clientRoute: '/',
  projectId: '1234',
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/report',
    charts: true,
    reportPageTitle: 'Test Automation Report',
    reportFilename: '[status]_[datetime]-[name]-report',
    timestamp: 'longDate',
    overwrite: false,
    code: true,
    autoOpen: true,
  },
  video: false,
  env: {
    username: 'Abhishek',
    password: 'Test@123',
    email: 'Abhishek.kumar3test.com',
    APIURL: '{{baseUrl}}',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: '{{baseUrl}}',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
