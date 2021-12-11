describe('Guest > create', () => {
  beforeEach(() => {
    cy.appNavigate('/guest')
    cy.clearCookies()
  })

  it('displays a form', () => {
    cy.get('[data-id="alert"]').should('have.length', 0)
    cy.get('[data-id="route-guest-new"]').should('exist')
    cy.get('h2').first().should('have.text', 'Choose a nickname')
    cy.get('p')
      .first()
      .should('have.text', 'This is how you will appear in games.')
    cy.get('[data-id="route-guest-new"] button').first().should('exist')
  })

  it('shows errors with bad data', () => {
    cy.get('[data-id="route-guest-new"] [data-id="text-input"]').type('a')
    cy.get('[data-id="route-guest-new"] button').click()

    cy.get('[data-id="route-guest-new"] button').should(
      'have.class',
      'cursor-not-allowed'
    )
    cy.get('[data-id="field"] [data-id="text-input"]').should(
      'have.class',
      'border-red-500'
    )
    cy.get('[data-id="field"] span')
      .first()
      .should('have.text', 'Must be between 3 and 50 characters.')
  })

  it('creates a guest with good data', () => {
    cy.get('[data-id="route-guest-new"] [data-id="text-input"]').type(
      'test-beans'
    )
    cy.get('[data-id="route-guest-new"] button').click()

    cy.get('[data-id="route-guest-new"] button').should(
      'have.class',
      'cursor-not-allowed'
    )

    cy.get('[data-id="alert"]').first().should('have.text', 'Welcome aboard!')

    cy.get('[data-id="route-guest-new"]').should('exist')
    cy.get('h2').first().should('have.text', 'Welcome, test-beans!')
    cy.get('[data-id="route-guest-new"] [data-id="button"]')
      .first()
      .should('have.text', 'New Game')
  })

  it('redirects with good data if redirect param is set', () => {
    cy.appNavigate('/guest?redirect=/game')

    cy.get('[data-id="route-guest-new"] [data-id="text-input"]').type(
      'test-beans'
    )
    cy.get('[data-id="route-guest-new"] button').click()

    cy.get('[data-id="route-guest-new"] button').should(
      'have.class',
      'cursor-not-allowed'
    )

    cy.get('[data-id="alert"]').first().should('have.text', 'Welcome aboard!')

    cy.get('[data-id="route-game-new"]').should('exist')
  })
})
