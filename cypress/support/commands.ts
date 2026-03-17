/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		searchByQuery(query: string): Chainable<void>
	}
}

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('searchByQuery', (query: string) => {
	cy.visit('/')
	cy.get('input[name="q"]').type(query)
	cy.get('button[type="submit"]').click()
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })