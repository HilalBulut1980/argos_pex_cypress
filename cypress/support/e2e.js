// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')
// import './commands'  // argos schlägt hiermit fehl --> auskommentiert!

import "@argos-ci/cypress/support";
import "cypress-real-events";
require('dotenv').config();


beforeEach(() => {
  if (Cypress.env('catch_JS_Error')) {
    cy.on('uncaught:exception', (err, runnable) => {
      // return false to prevent the error from
      // failing this test
      return false
    })
  }

  // cy.intercept({
  //   method: 'GET',
  //   url: process.env.JS_FILES,
  //   hostname: process.env.JS_FILES_HOSTNAME,
  // }).as('configurator-js-files')
  // we don't wait for the js-files, we wait for correct prices instead

})


//custom command to check visibility of the freshChat icon
Cypress.Commands.add('checkFreshChat', () => {
  // cy.get('freshchat-widget').shadow().find('#fc-widget-chat-icon').should('be.visible') // nach PEX-4301 icon mit cypress getestet fehlend 
  // cy.get('iframe#fc_widget', { timeout: 10000 }).should('be.visible', { timeout: 10000 })

  cy.get('body').then(($body) => {
    if ($body.find('iframe#fc_widget').length) {
      // iframe was found
      cy.log('IFRAME FOUND')
      cy.get('iframe#fc_widget').invoke('attr', 'data-visual-test', 'removed');
    }
    else {
      cy.log('IFRAME NOT FOUND')
    }

  })
})

//custom command to check visibility of youtube videos
Cypress.Commands.add('checkYouTube', () => {

  // youtube-video css selector: .r-video
  cy.get('body').then(($body) => {
    if ($body.find('.r-video').length) {
      // iframe was found
      cy.log('YOUTUBE VIDEO FOUND')
      cy.get('.r-video').invoke('attr', 'data-visual-test', 'transparent');
    }
    else {
      cy.log('YOUTUBE VIDEO FOUND')
    }
  })

  // youtube-video css selector: .rvideo
  cy.get('body').then(($body) => {
    if ($body.find('.video').length) {
      // iframe was found
      cy.log('YOUTUBE VIDEO FOUND')
      cy.get('.video').invoke('attr', 'data-visual-test', 'transparent');
    }
    else {
      cy.log('YOUTUBE VIDEO FOUND')
    }
  })

  // youtube-video css selector: #video
  cy.get('body').then(($body) => {
    if ($body.find('#video').length) {
      // iframe was found
      cy.log('YOUTUBE VIDEO FOUND')
      cy.get('#video').invoke('attr', 'data-visual-test', 'transparent');
    }
    else {
      cy.log('YOUTUBE VIDEO FOUND')
    }
  })

})

//custom command to open a selectbox
Cypress.Commands.add('openSelect', { prevSubject: 'element' }, (subject, method) => {
  const dropdown = subject[0];
  dropdown.size = dropdown.options.length;
})

//custom command to close a selectbox
Cypress.Commands.add('closeSelect', { prevSubject: 'element' }, (subject, method) => {
  const dropdown = subject[0];
  dropdown.size = 0;
})

Cypress.Commands.add('clearPopup', () => {
  // workaorund in order to close the last opened popup
  cy.contains('Mehr erfahren').realHover().wait(500)
})

// This overwrite is required becuase Basic Authentification is not working
// for Electron Browser if the domain is defined by baseUrl Configuration
// see https://github.com/cypress-io/cypress/issues/1639

Cypress.Commands.overwrite('visit', (orig, url, options) => {
  options = options || {};
  if (Cypress.env('AUTH_USER') && Cypress.env('AUTH_PASS')) {
    options.auth = {
      username: Cypress.env('AUTH_USER'),
      password: Cypress.env('AUTH_PASS')
    };
  }
  return orig(url, options)
});



