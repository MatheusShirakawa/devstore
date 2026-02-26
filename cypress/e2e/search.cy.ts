describe('search products', () => {
	it('should be able to search for a product and add it to the cart ', () => {
		cy.visit('/')
		cy.get('input[name="q"]').type('moletom')
		cy.get('button[type="submit"]').click()

		cy.location('pathname').should('include', '/search')
		cy.location('search').should('include', 'q=moletom')

		cy.get('a[href*="/product"]').should('exist')
	})

	it('should not be able to visit search page a search query', () => {
		cy.on('uncaught:exception', () => {
			return false
		})
		cy.visit('/search')

		cy.location('pathname').should('equal', '/')
	})
})