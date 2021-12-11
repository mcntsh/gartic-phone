describe('Guest > create', () => {
  beforeEach(() => {
    cy.clearCookies()
  })

  it('will redirect if there is no guest cookie', () => {
    cy.appNavigate('/game')
    cy.get('[data-id="route-guest-new"]').should('exist')

    cy.appNavigate('/game/foo-bar-baz')
    cy.get('[data-id="route-guest-new"]').should('exist')
  })

  it('will show a creation page with a cookie', () => {
    cy.createGuestSession()
    cy.appNavigate('/game')

    cy.get('[data-id="route-game-new"]').should('exist')
    cy.get('h2').first().should('have.text', 'New Game')
    cy.get('p').first().should('have.text', 'Click the button below to start.')
    cy.get('[data-id="route-game-new"] button').first().should('exist')
  })

  it('clicking the button will create a new game and redirect', () => {
    cy.createGuestSession()
    cy.appNavigate('/game')

    cy.get('[data-id="route-game-new"] button').first().click()
    cy.get('[data-id="route-game-new"] [data-id="loading-icon"]').should(
      'exist'
    )
    cy.get('[data-id="route-game-new"] button').should(
      'have.class',
      'cursor-not-allowed'
    )

    cy.get('[data-id="alert"]').should('have.length', 1)
    cy.get('[data-id="route-game"]').should('exist')
  })
})
